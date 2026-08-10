import {
  EØSBegrunnelseDokumentNavn,
  KSBegrunnelseDokumentNavn,
} from '../../../../../../util/typer';
import { Rule } from 'sanity';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';
import { Tema } from '../../tema';

export const erNasjonalBegrunnelse: (document: Record<string, any>) => boolean = document =>
  document[KSBegrunnelseDokumentNavn.TEMA] &&
  document[KSBegrunnelseDokumentNavn.TEMA] == Tema.NASJONAL;

export const erEøsBegrunnelse: (document: Record<string, any>) => boolean = document =>
  document[KSBegrunnelseDokumentNavn.TEMA] && document[KSBegrunnelseDokumentNavn.TEMA] == Tema.EØS;

export const kanVilkårsvurderingTriggereVelges = (document: Record<string, any>) =>
  erEøsBegrunnelse(document) &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK] &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK].includes(EØSTriggerType.VILKÅRSVURDERING);

export const kanKompetanseTriggereVelges = (document: Record<string, any>) =>
  erEøsBegrunnelse(document) &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK] &&
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
    if (!erEøsBegrunnelse(document as Record<string, any>) && currentValue !== undefined) {
      return feilmelding;
    }
    return true;
  });

const lagEØSFeltObligatoriskRegel = (rule: Rule, triggerTyperforFelt: EØSTriggerType[]) =>
  rule.custom((currentValue, { document }) => {
    if (
      erEøsBegrunnelse(document as Record<string, any>) &&
      kanVelgeTriggerForEØSBegrunnelse(triggerTyperforFelt, document as Record<string, any>) &&
      currentValue === undefined
    ) {
      return 'Du må velge minst ett valg for triggerne';
    }
    return true;
  });

const kanTriggereAvTypeVelges = (
  triggerTyperforFelt: EØSTriggerType,
  document: Record<string, any>,
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
  document: Record<string, any>,
) => triggerTyperForFelt.every(triggerType => kanTriggereAvTypeVelges(triggerType, document));
