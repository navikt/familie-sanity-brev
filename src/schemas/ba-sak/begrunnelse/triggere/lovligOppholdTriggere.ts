import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { lovligOppholdTriggerTyper, Vilkår, vilkårTriggerTilMenynavn } from '../typer';

export const lovligOppholdTriggere = {
  title: 'Triggere for "Lovlig opphold"',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.TRIGGES_AV_LOVLIG_OPPHOLD,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: lovligOppholdTriggerTyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) => !(document.vilkaar && document.vilkaar.includes(Vilkår.LOVLIG_OPPHOLD)),
};
