import { giftPartnerskapTriggerTyper, NasjonaleVilkår, vilkårTriggerTilMenynavn } from '../typer';
import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import {
  erNasjonalEllerInstitusjonsBegrunnelse,
  lagUtfyltNasjonaltFeltMenFeilRegelverkRegel,
} from '../utils';

export const giftPartnerskapTriggere = {
  title: 'Triggere for "Gift partnerskap"',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.GIFT_PARTNERSKAP_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: giftPartnerskapTriggerTyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) =>
    !(
      erNasjonalEllerInstitusjonsBegrunnelse(document) &&
      document.vilkaar &&
      document.vilkaar.includes(NasjonaleVilkår.GIFT_PARTNERSKAP)
    ),
  validation: rule => lagUtfyltNasjonaltFeltMenFeilRegelverkRegel(rule),
};
