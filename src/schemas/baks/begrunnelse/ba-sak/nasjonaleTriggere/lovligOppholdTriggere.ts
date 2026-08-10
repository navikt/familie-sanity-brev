import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import {
  Begrunnelse,
  lovligOppholdTriggerTyper,
  NasjonaleVilkår,
  vilkårTriggerTilMenynavn,
} from '../typer';
import {
  erNasjonalEllerInstitusjonsBegrunnelse,
  lagUtfyltNasjonaltFeltMenFeilRegelverkRegel,
} from '../utils';
import { Rule } from 'sanity';

export const lovligOppholdTriggere = {
  title: 'Triggere for "Lovlig opphold"',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.TRIGGES_AV_LOVLIG_OPPHOLD,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: lovligOppholdTriggerTyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }: { document: Begrunnelse }) =>
    !(
      erNasjonalEllerInstitusjonsBegrunnelse(document) &&
      document.vilkaar &&
      document.vilkaar.includes(NasjonaleVilkår.LOVLIG_OPPHOLD)
    ),
  validation: (rule: Rule) => lagUtfyltNasjonaltFeltMenFeilRegelverkRegel(rule),
};
