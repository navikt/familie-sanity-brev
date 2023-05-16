import { BegrunnelseDokumentNavn, EØSBegrunnelseDokumentNavn } from '../../../../../../util/typer';
import { Begrunnelse, EøsBegrunnelse } from '../../typer';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';
import { BegrunnelseTema } from '../../sanityMappeFelt/begrunnelsetema';

export const erEøsBegrunnelse = (document: Begrunnelse): document is EøsBegrunnelse =>
  (document[BegrunnelseDokumentNavn.TEMA] &&
    document[BegrunnelseDokumentNavn.TEMA] === BegrunnelseTema.PRIMÆRLAND) ||
  document[BegrunnelseDokumentNavn.TEMA] === BegrunnelseTema.SEKUNDÆRLAND;

export const kanVilkårsvurderingTriggereVelges = document =>
  erEøsBegrunnelse(document) &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK] &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK].includes(EØSTriggerType.VILKÅRSVURDERING);

export const kanKompetanseTriggereVelges = document =>
  erEøsBegrunnelse(document) &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK] &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK].includes(EØSTriggerType.KOMPETANSE);

export const hentEØSTriggereRegler = (
  rule,
  erObligatoriskOmSynlig: boolean,
  regelTyper: EØSTriggerType[],
) => [
  hentEØSFeltRegler(
    rule,
    'en EØS-trigger er valgt, men behandlingstema for begrunnelsen er ikke EØS.',
  ),
  erObligatoriskOmSynlig && lagEØSFeltObligatoriskRegel(rule, regelTyper),
];

export const hentEØSHjemmelRegler = rule =>
  hentEØSFeltRegler(
    rule,
    'En EØS-hjemmel er valgt, men behandlingstema for begrunnelsen er ikke eøs.',
  );

export const hentEØSFeltRegler = (rule, feilmelding: string) =>
  rule.custom((currentValue, { document }) => {
    if (!erEøsBegrunnelse(document) && currentValue !== undefined) {
      return feilmelding;
    }
    return true;
  });

const lagEØSFeltObligatoriskRegel = (rule, triggerTyperforFelt: EØSTriggerType[]) =>
  rule.custom((currentValue, { document }) => {
    if (
      erEøsBegrunnelse(document) &&
      kanVelgeTriggerForEØSBegrunnelse(triggerTyperforFelt, document) &&
      currentValue === undefined
    ) {
      return 'Du må velge minst ett valg for triggerne';
    }
    return true;
  });

const kanTriggereAvTypeVelges = (
  triggerTyperforFelt: EØSTriggerType,
  document: Begrunnelse,
): boolean => {
  switch (triggerTyperforFelt) {
    case EØSTriggerType.VILKÅRSVURDERING:
      return kanVilkårsvurderingTriggereVelges(document);
    case EØSTriggerType.KOMPETANSE:
      return kanKompetanseTriggereVelges(document);
  }
};

const kanVelgeTriggerForEØSBegrunnelse = (
  triggerTyperForFelt: EØSTriggerType[],
  document: EøsBegrunnelse,
) => triggerTyperForFelt.every(triggerType => kanTriggereAvTypeVelges(triggerType, document));
