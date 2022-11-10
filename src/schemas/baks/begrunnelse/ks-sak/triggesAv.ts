import { borMedSøkerTriggere } from '../ba-sak/nasjonaleTriggere/borMedSøkerTriggere';
import { lovligOppholdTriggere } from '../ba-sak/nasjonaleTriggere/lovligOppholdTriggere';
import { bosattIRiketTriggere } from '../ba-sak/nasjonaleTriggere/bosattIRiketTriggere';
import { giftPartnerskapTriggere } from '../ba-sak/nasjonaleTriggere/giftPartnerskapTriggere';
import { utvidetBarnetrygdTriggere } from '../ba-sak/nasjonaleTriggere/utvidetBarnetrygdTriggere';
import { øvrigeTriggere } from '../ba-sak/nasjonaleTriggere/øvrigeTriggere';
import { endringsårsakTrigger } from '../ba-sak/nasjonaleTriggere/endringsårsakTrigger';
import { endretUtbetalingsperiodeTriggere } from '../ba-sak/nasjonaleTriggere/endretUtbetalingPeriodeTrigger';
import { endretUtbetalingsperiodeDeltBostedUtbetalingTrigger } from '../ba-sak/nasjonaleTriggere/endretUtbetalingPeriodeDeltBostedTrigger';
import { annenForeldersAktivitetTrigger } from '../ba-sak/eøs/eøsTriggere/annenForeldersAktivitetTrigger';
import { barnetsBostedslandTrigger } from '../ba-sak/eøs/eøsTriggere/barnetsBostedslandTriggere';
import { kompetentLandTrigger } from '../ba-sak/eøs/eøsTriggere/kompetentLandTrigger';
import { utdypendeVilkårsvurderingerForEØSTriggere } from '../ba-sak/eøs/eøsTriggere/utdypendeVilkårsvurderingerTriggere';
import { hvilkeTriggereSkalBrukes } from '../ba-sak/eøs/eøsTriggere/hvilkeTriggereSkalBrukes';

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
  hvilkeTriggereSkalBrukes,
  annenForeldersAktivitetTrigger,
  barnetsBostedslandTrigger,
  kompetentLandTrigger,
  utdypendeVilkårsvurderingerForEØSTriggere,
];

export const triggesAv = [...nasjonaleBegrunnelserTriggere, ...EØSBegrunnelseTriggere];
