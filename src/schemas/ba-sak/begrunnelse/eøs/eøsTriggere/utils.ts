import { BegrunnelseDokumentNavn, EØSBegrunnelseDokumentNavn } from '../../../../../util/typer';
import { Behandlingstema } from '../../typer';
import { erNasjonalBegrunnelse } from '../../utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

export const erEøsBegrunnelse = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.EØS);

export const kanVilkårsvurderingTriggereVelges = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.EØS) &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK] &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK].includes(EØSTriggerType.VILKÅRSVURDERING);

export const kanKompetanseTriggereVelges = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.EØS) &&
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
  hentGyldigeTriggereRegel(rule, regelTyper),
  erObligatoriskOmSynlig && lagEØSFeltObligatoriskRegel(rule, regelTyper),
];

export const hentEØSHjemmelRegler = rule =>
  hentEØSFeltRegler(
    rule,
    'En EØS-hjemmel er valgt, men behandlingstema for begrunnelsen er ikke eøs.',
  );

export const hentEØSFeltRegler = (rule, feilmelding: string) =>
  rule.custom((currentValue, { document }) => {
    if (erNasjonalBegrunnelse(document) && currentValue !== undefined) {
      return feilmelding;
    }
    return true;
  });

export const hentGyldigeTriggereRegel = (rule, triggerTyperforFelt: EØSTriggerType[]) =>
  rule.custom((currentValue, { document }) => {
    triggerTyperforFelt.forEach(triggerType => {
      if (!kanTriggereAvTypeVelges(triggerType, document) && currentValue !== undefined) {
        return `Det er ikke valgt at ${triggerType}-triggere kan velges, men en ${triggerType}-trigger er valgt`;
      }
    });

    return true;
  });

const lagEØSFeltObligatoriskRegel = (rule, triggerTyperforFelt: EØSTriggerType[]) =>
  rule.custom((currentValue, { document }) => {
    if (
      erEøsBegrunnelse(document) &&
      kanVelgeTriggerForEØSBegrunnesle(triggerTyperforFelt, document) &&
      currentValue === undefined
    ) {
      return 'Du må velge minst ett valg for triggerne';
    }
    return true;
  });

const kanTriggereAvTypeVelges = (
  triggerTyperforFelt: EØSTriggerType,
  document: any,
): ((document: any) => boolean) => {
  switch (triggerTyperforFelt) {
    case EØSTriggerType.VILKÅRSVURDERING:
      return kanVilkårsvurderingTriggereVelges(document);
    case EØSTriggerType.KOMPETANSE:
      return kanKompetanseTriggereVelges(document);
  }
};

const kanVelgeTriggerForEØSBegrunnesle = (triggerTyperForFelt: EØSTriggerType[], document: any) =>
  triggerTyperForFelt.every(triggerType => kanTriggereAvTypeVelges(triggerType, document));
