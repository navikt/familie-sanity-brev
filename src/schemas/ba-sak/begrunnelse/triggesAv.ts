import { borMedSøkerTriggere } from './triggere/borMedSøkerTriggere';
import { lovligOppholdTriggere } from './triggere/lovligOppholdTriggere';
import { bosattIRiketTriggere } from './triggere/bosattIRiketTriggere';
import { giftPartnerskapTriggere } from './triggere/giftPartnerskapTriggere';
import { utvidetBarnetrygdTriggere } from './triggere/utvidetBarnetrygdTriggere';
import { øvrigeTriggere } from './triggere/øvrigeTriggere';
import { endringsårsakTrigger } from './triggere/endringsårsakTrigger';
import { endretUtbetalingsperiodeTriggere } from './triggere/endretUtbetalingPeriodeTrigger';
import { endretUtbetalingsperiodeDeltBostedUtbetalingTrigger } from './triggere/endretUtbetalingPeriodeDeltBostedTrigger';

export const triggesAv = [
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
