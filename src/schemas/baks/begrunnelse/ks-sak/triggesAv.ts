import { borMedSøkerTriggere } from '../ba-sak/nasjonaleTriggere/borMedSøkerTriggere';
import { bosattIRiketTriggere } from '../ba-sak/nasjonaleTriggere/bosattIRiketTriggere';
import {
  endringsårsakTrigger,
  erEndretUtbetaling,
} from '../ba-sak/nasjonaleTriggere/endringsårsakTrigger';
import { endretUtbetalingsperiodeTriggere } from '../ba-sak/nasjonaleTriggere/endretUtbetalingPeriodeTrigger';
import { endretUtbetalingsperiodeDeltBostedUtbetalingTrigger } from '../ba-sak/nasjonaleTriggere/endretUtbetalingPeriodeDeltBostedTrigger';
import { annenForeldersAktivitetTrigger } from '../ba-sak/eøs/eøsTriggere/annenForeldersAktivitetTrigger';
import { barnetsBostedslandTrigger } from '../ba-sak/eøs/eøsTriggere/barnetsBostedslandTriggere';
import { kompetentLandTrigger } from '../ba-sak/eøs/eøsTriggere/kompetentLandTrigger';
import { utdypendeVilkårsvurderingerForEØSTriggere } from '../ba-sak/eøs/eøsTriggere/utdypendeVilkårsvurderingerTriggere';
import { hvilkeTriggereSkalBrukes } from '../ba-sak/eøs/eøsTriggere/hvilkeTriggereSkalBrukes';
import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { VilkårTriggere, vilkårTriggerTilMenynavn } from '../ba-sak/typer';
import {
  erNasjonalEllerInstitusjonsBegrunnelse,
  lagUtfyltNasjonaltFeltMenFeilBehandlingstemaRegel,
} from '../ba-sak/utils';

export const øvrigeTriggertyper = [
  VilkårTriggere.SATSENDRING,
  VilkårTriggere.GJELDER_FØRSTE_PERIODE,
  VilkårTriggere.GJELDER_FRA_INNVILGELSESTIDSPUNKT,
  VilkårTriggere.BARN_DØD,
];

export const øvrigeTriggere = {
  title: 'Øvrige triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: øvrigeTriggertyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) =>
    erEndretUtbetaling(document) || !erNasjonalEllerInstitusjonsBegrunnelse(document),
  validation: rule => lagUtfyltNasjonaltFeltMenFeilBehandlingstemaRegel(rule),
};

const nasjonaleBegrunnelserTriggere = [
  bosattIRiketTriggere,
  borMedSøkerTriggere,
  øvrigeTriggere,
  endringsårsakTrigger,
  endretUtbetalingsperiodeTriggere,
  endretUtbetalingsperiodeDeltBostedUtbetalingTrigger,
];

const EØSBegrunnelseTriggere = [
  hvilkeTriggereSkalBrukes,
  annenForeldersAktivitetTrigger,
  barnetsBostedslandTrigger,
  kompetentLandTrigger,
  utdypendeVilkårsvurderingerForEØSTriggere,
];

export const triggesAv = [...nasjonaleBegrunnelserTriggere, ...EØSBegrunnelseTriggere];
