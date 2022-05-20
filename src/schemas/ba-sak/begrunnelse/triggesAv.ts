import { BegrunnelseDokumentNavn, SanityTyper } from '../../../util/typer';
import {
  borMedSøkerTriggere,
  bosattIRiketTriggere,
  giftPartnerskapTriggere,
  lovligOppholdTriggere,
  Vilkår,
  vilkårTriggerTilMenynavn,
} from './typer';

export const triggesAv = [
  {
    title: 'Triggere for "Lovlig opphold"',
    type: SanityTyper.ARRAY,
    name: BegrunnelseDokumentNavn.TRIGGES_AV_LOVLIG_OPPHOLD,
    of: [{ type: SanityTyper.STRING }],
    options: {
      list: lovligOppholdTriggere.map(trigger => vilkårTriggerTilMenynavn[trigger]),
    },
    hidden: ({ document }) =>
      !(document.vilkaar && document.vilkaar.includes(Vilkår.LOVLIG_OPPHOLD)),
  },
  {
    title: 'Triggere for "Bosatt i riket"',
    type: SanityTyper.ARRAY,
    name: BegrunnelseDokumentNavn.BOSATT_I_RIKET_TRIGGERE,
    of: [{ type: SanityTyper.STRING }],
    options: {
      list: bosattIRiketTriggere.map(trigger => vilkårTriggerTilMenynavn[trigger]),
    },
    hidden: ({ document }) =>
      !(document.vilkaar && document.vilkaar.includes(Vilkår.BOSATT_I_RIKET)),
  },
  {
    title: 'Triggere for "Gift partnerskap"',
    type: SanityTyper.ARRAY,
    name: BegrunnelseDokumentNavn.GIFT_PARTNERSKAP_TRIGGERE,
    of: [{ type: SanityTyper.STRING }],
    options: {
      list: giftPartnerskapTriggere.map(trigger => vilkårTriggerTilMenynavn[trigger]),
    },
    hidden: ({ document }) =>
      !(document.vilkaar && document.vilkaar.includes(Vilkår.GIFT_PARTNERSKAP)),
  },
  {
    title: 'Triggere for "Bor med søker"',
    type: SanityTyper.ARRAY,
    name: BegrunnelseDokumentNavn.BOR_MED_SØKER_TRIGGERE,
    of: [{ type: SanityTyper.STRING }],
    options: {
      list: borMedSøkerTriggere.map(trigger => vilkårTriggerTilMenynavn[trigger]),
    },
    hidden: ({ document }) =>
      !(document.vilkaar && document.vilkaar.includes(Vilkår.BOR_MED_SOKER)),
  },
];
