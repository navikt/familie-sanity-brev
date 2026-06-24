import { BegrunnelseDokumentNavn, EØSBegrunnelseDokumentNavn } from '../../../../../../util/typer';
import { Begrunnelse, EøsBegrunnelse } from '../../typer';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';
import { Regelverk } from '../../sanityMappeFelt/regelverk';
import { Rule } from 'sanity';

export const erEøsBegrunnelse = (document: Begrunnelse): document is EøsBegrunnelse =>
  document[BegrunnelseDokumentNavn.REGELVERK] != undefined &&
  document[BegrunnelseDokumentNavn.REGELVERK] === Regelverk.EØS;

export const kanVilkårsvurderingTriggereVelges = (document: Begrunnelse): boolean =>
  erEøsBegrunnelse(document) &&
  !!document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK] &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK].includes(EØSTriggerType.VILKÅRSVURDERING);

export const kanKompetanseTriggereVelges = (document: Begrunnelse): boolean =>
  erEøsBegrunnelse(document) &&
  !!document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK] &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK].includes(EØSTriggerType.KOMPETANSE);

export const hentEØSTriggereRegler = (
  rule: Rule,
  erObligatoriskOmSynlig: boolean,
  regelTyper: EØSTriggerType[],
) => [
  hentEØSFeltRegler(rule, 'en EØS-trigger er valgt, men regleverk for begrunnelsen er ikke EØS.'),
  erObligatoriskOmSynlig && lagEØSFeltObligatoriskRegel(rule, regelTyper),
];

export const hentEØSHjemmelRegler = (rule: Rule) =>
  hentEØSFeltRegler(rule, 'En EØS-hjemmel er valgt, men regelverk for begrunnelsen er ikke eøs.');

export const hentEØSFeltRegler = (rule: Rule, feilmelding: string) =>
  rule.custom((currentValue, { document }) => {
    if (!erEøsBegrunnelse(document as Begrunnelse) && currentValue !== undefined) {
      return feilmelding;
    }
    return true;
  });

const lagEØSFeltObligatoriskRegel = (rule: Rule, triggerTyperforFelt: EØSTriggerType[]) =>
  rule.custom((currentValue, { document }) => {
    if (
      erEøsBegrunnelse(document as Begrunnelse) &&
      kanVelgeTriggerForEØSBegrunnelse(triggerTyperforFelt, document as EøsBegrunnelse) &&
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
