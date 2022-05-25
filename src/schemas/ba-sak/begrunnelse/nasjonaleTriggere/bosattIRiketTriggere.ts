import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { bosattIRiketTriggerTyper, Vilkår, vilkårTriggerTilMenynavn } from '../typer';
import { hentNasjonaleTriggereRegler } from './utils';

export const bosattIRiketTriggere = {
  title: 'Triggere for "Bosatt i riket"',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.BOSATT_I_RIKET_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: bosattIRiketTriggerTyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) => !(document.vilkaar && document.vilkaar.includes(Vilkår.BOSATT_I_RIKET)),
  validation: rule => hentNasjonaleTriggereRegler(rule),
};
