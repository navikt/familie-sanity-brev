import { borMedSøkerTriggere } from './triggere/borMedSøkerTriggere';
import { lovligOppholdTriggere } from './triggere/lovligOppholdTriggere';
import { bosattIRiketTriggere } from './triggere/bosattIRiketTriggere';
import { giftPartnerskapTriggere } from './triggere/giftPartnerskapTriggere';

export const triggesAv = [
  lovligOppholdTriggere,
  bosattIRiketTriggere,
  giftPartnerskapTriggere,
  borMedSøkerTriggere,
];
