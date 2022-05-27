import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { lovligOppholdTriggerTyper, Vilkår, vilkårTriggerTilMenynavn } from '../typer';
import { hentNasjonaleTriggereRegler } from './utils';
import { erNasjonalBegrunnelse } from '../utils';

export const lovligOppholdTriggere = {
  title: 'Triggere for "Lovlig opphold"',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.TRIGGES_AV_LOVLIG_OPPHOLD,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: lovligOppholdTriggerTyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) =>
    !(
      erNasjonalBegrunnelse(document) &&
      document.vilkaar &&
      document.vilkaar.includes(Vilkår.LOVLIG_OPPHOLD)
    ),
  validation: rule => hentNasjonaleTriggereRegler(rule),
};
