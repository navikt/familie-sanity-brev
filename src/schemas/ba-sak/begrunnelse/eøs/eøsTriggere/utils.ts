import {
  BegrunnelseDokumentNavn,
  EØSBegrunnelseDokumentNavn,
  EØSRegelsettDokumentNavn,
} from '../../../../../util/typer';
import { Behandlingstema } from '../../typer';
import { erNasjonalBegrunnelse } from '../../utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

export const skalViseEøsTrigger = document =>
  erEøsBegrunnelse(document) || erEØSRegelsett(document);

export const erEøsBegrunnelse = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.EØS);

export const erEØSRegelsett = document => {
  return document._type === EØSRegelsettDokumentNavn.EØS_REGELSETT;
};

export const kanVilkårsvurderingTriggereVelges = document =>
  kanVilkårsvurderingTriggereBegrunnelse(document) ||
  kanVilkårsvurderingTriggereEøsRegelsett(document);

export const kanVilkårsvurderingTriggereBegrunnelse = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.EØS) &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK] &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK].includes(EØSTriggerType.VILKÅRSVURDERING);

export const kanVilkårsvurderingTriggereEøsRegelsett = document =>
  document._type === EØSRegelsettDokumentNavn.EØS_REGELSETT &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK] &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK].includes(EØSTriggerType.VILKÅRSVURDERING);

export const kanKompetanseTriggereVelges = document =>
  kanKompetanseTriggereVelgesBegrunnelse(document) ||
  kanKompetanseTriggereVelgesEøsRegelsett(document);

export const kanKompetanseTriggereVelgesBegrunnelse = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.EØS) &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK] &&
  document[EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK].includes(EØSTriggerType.KOMPETANSE);

export const kanKompetanseTriggereVelgesEøsRegelsett = document =>
  document._type === EØSRegelsettDokumentNavn.EØS_REGELSETT &&
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
    if (erNasjonalBegrunnelse(document) && currentValue !== undefined) {
      return feilmelding;
    }
    return true;
  });

const lagEØSFeltObligatoriskRegel = (rule, triggerTyperforFelt: EØSTriggerType[]) =>
  rule.custom((currentValue, { document }) => {
    if (
      skalViseEøsTrigger(document) &&
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
