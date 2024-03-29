import { borMedSøkerTriggere } from './borMedSøkerTriggere';
import { lovligOppholdTriggere } from './nasjonaleTriggere/lovligOppholdTriggere';
import { bosattIRiketTriggere } from './nasjonaleTriggere/bosattIRiketTriggere';
import { giftPartnerskapTriggere } from './nasjonaleTriggere/giftPartnerskapTriggere';
import { utvidetBarnetrygdTriggere } from './nasjonaleTriggere/utvidetBarnetrygdTriggere';
import { øvrigeTriggere } from './øvrigeTriggere';
import { endringsårsakTrigger } from './nasjonaleTriggere/endringsårsakTrigger';
import { endretUtbetalingsperiodeTriggere } from './nasjonaleTriggere/endretUtbetalingPeriodeTrigger';
import { endretUtbetalingsperiodeDeltBostedUtbetalingTrigger } from './nasjonaleTriggere/endretUtbetalingPeriodeDeltBostedTrigger';
import { annenForeldersAktivitetTrigger } from './eøs/eøsTriggere/annenForeldersAktivitetTrigger';
import { barnetsBostedslandTrigger } from './eøs/eøsTriggere/barnetsBostedslandTriggere';
import { kompetentLandTrigger } from './eøs/eøsTriggere/kompetentLandTrigger';
import { utdypendeVilkårsvurderingerForEØSTriggere } from './eøs/eøsTriggere/utdypendeVilkårsvurderingerTriggere';
import { hvilkeTriggereSkalBrukes } from './eøs/eøsTriggere/hvilkeTriggereSkalBrukes';
import { vilkårsvurderingTriggere } from './eøs/eøsTriggere/vilkårsvurderingerTriggere';

const nasjonaleBegrunnelserTriggere = [
  lovligOppholdTriggere,
  bosattIRiketTriggere,
  giftPartnerskapTriggere,
  utvidetBarnetrygdTriggere,
  endringsårsakTrigger,
  endretUtbetalingsperiodeTriggere,
  endretUtbetalingsperiodeDeltBostedUtbetalingTrigger,
];

const EØSBegrunnelseTriggere = [
  hvilkeTriggereSkalBrukes,
  annenForeldersAktivitetTrigger,
  barnetsBostedslandTrigger,
  kompetentLandTrigger,
  vilkårsvurderingTriggere,
  utdypendeVilkårsvurderingerForEØSTriggere,
];

export const triggesAv = [
  ...nasjonaleBegrunnelserTriggere,
  ...EØSBegrunnelseTriggere,
  borMedSøkerTriggere,
  øvrigeTriggere,
];
