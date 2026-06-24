import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import {
  Begrunnelse,
  bosattIRiketTriggerTyper,
  NasjonaleVilkår,
  vilkårTriggerTilMenynavn,
} from '../typer';
import {
  erNasjonalEllerInstitusjonsBegrunnelse,
  lagUtfyltNasjonaltFeltMenFeilRegelverkRegel,
} from '../utils';
import { Rule } from 'sanity';

export const bosattIRiketTriggere = {
  title: 'Triggere for "Bosatt i riket"',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.BOSATT_I_RIKET_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: bosattIRiketTriggerTyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }: { document: Begrunnelse }) =>
    !(
      erNasjonalEllerInstitusjonsBegrunnelse(document) &&
      document.vilkaar &&
      document.vilkaar.includes(NasjonaleVilkår.BOSATT_I_RIKET)
    ),
  validation: (rule: Rule) => lagUtfyltNasjonaltFeltMenFeilRegelverkRegel(rule),
};
