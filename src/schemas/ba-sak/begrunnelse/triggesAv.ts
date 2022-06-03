import { borMedSøkerTriggere } from './nasjonaleTriggere/borMedSøkerTriggere';
import { lovligOppholdTriggere } from './nasjonaleTriggere/lovligOppholdTriggere';
import { bosattIRiketTriggere } from './nasjonaleTriggere/bosattIRiketTriggere';
import { giftPartnerskapTriggere } from './nasjonaleTriggere/giftPartnerskapTriggere';
import { utvidetBarnetrygdTriggere } from './nasjonaleTriggere/utvidetBarnetrygdTriggere';
import { øvrigeTriggere } from './nasjonaleTriggere/øvrigeTriggere';
import { endringsårsakTrigger } from './nasjonaleTriggere/endringsårsakTrigger';
import { endretUtbetalingsperiodeTriggere } from './nasjonaleTriggere/endretUtbetalingPeriodeTrigger';
import { endretUtbetalingsperiodeDeltBostedUtbetalingTrigger } from './nasjonaleTriggere/endretUtbetalingPeriodeDeltBostedTrigger';
import { annenForeldersAktivitetTrigger } from './eøs/eøsTriggere/annenForeldersAktivitetTrigger';
import { barnetsBosteslandTrigger } from './eøs/eøsTriggere/barnetsBostedslandTriggere';
import { kompetentLandTrigger } from './eøs/eøsTriggere/kompetentLandTrigger';

const nasjonaleBegrunnelserTriggere = [
  lovligOppholdTriggere,
  bosattIRiketTriggere,
  giftPartnerskapTriggere,
  borMedSøkerTriggere,
  utvidetBarnetrygdTriggere,
  øvrigeTriggere,
  endringsårsakTrigger,
  endretUtbetalingsperiodeTriggere,
  endretUtbetalingsperiodeDeltBostedUtbetalingTrigger,
];

const EØSBegrunnelseTriggere = [
  annenForeldersAktivitetTrigger,
  barnetsBosteslandTrigger,
  kompetentLandTrigger,
];

export const triggesAv = [...nasjonaleBegrunnelserTriggere, ...EØSBegrunnelseTriggere];
