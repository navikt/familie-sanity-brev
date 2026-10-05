import { borMedSøkerTriggere } from './borMedSøkerTriggere';
import { annenForeldersAktivitetTrigger } from './eøs/eøsTriggere/annenForeldersAktivitetTrigger';
import { barnetsBostedslandTrigger } from './eøs/eøsTriggere/barnetsBostedslandTriggere';
import { hvilkeTriggereSkalBrukes } from './eøs/eøsTriggere/hvilkeTriggereSkalBrukes';
import { kompetentLandTrigger } from './eøs/eøsTriggere/kompetentLandTrigger';
import { utdypendeVilkårsvurderingerForEØSTriggere } from './eøs/eøsTriggere/utdypendeVilkårsvurderingerTriggere';
import { vilkårsvurderingTriggere } from './eøs/eøsTriggere/vilkårsvurderingerTriggere';
import { bosattIRiketTriggere } from './nasjonaleTriggere/bosattIRiketTriggere';
import { endretUtbetalingsperiodeDeltBostedUtbetalingTrigger } from './nasjonaleTriggere/endretUtbetalingPeriodeDeltBostedTrigger';
import { endretUtbetalingsperiodeTriggere } from './nasjonaleTriggere/endretUtbetalingPeriodeTrigger';
import { endringsårsakTrigger } from './nasjonaleTriggere/endringsårsakTrigger';
import { giftPartnerskapTriggere } from './nasjonaleTriggere/giftPartnerskapTriggere';
import { lovligOppholdTriggere } from './nasjonaleTriggere/lovligOppholdTriggere';
import { utvidetBarnetrygdTriggere } from './nasjonaleTriggere/utvidetBarnetrygdTriggere';
import { øvrigeTriggere } from './øvrigeTriggere';

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
