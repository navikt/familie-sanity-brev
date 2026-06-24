import {
  Begrunnelse,
  giftPartnerskapTriggerTyper,
  NasjonaleVilkår,
  vilkårTriggerTilMenynavn,
} from '../typer';
import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import {
  erNasjonalEllerInstitusjonsBegrunnelse,
  lagUtfyltNasjonaltFeltMenFeilRegelverkRegel,
} from '../utils';
import { Rule } from 'sanity';

export const giftPartnerskapTriggere = {
  title: 'Triggere for "Gift partnerskap"',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.GIFT_PARTNERSKAP_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: giftPartnerskapTriggerTyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }: { document: Begrunnelse }) =>
    !(
      erNasjonalEllerInstitusjonsBegrunnelse(document) &&
      document.vilkaar &&
      document.vilkaar.includes(NasjonaleVilkår.GIFT_PARTNERSKAP)
    ),
  validation: (rule: Rule) => lagUtfyltNasjonaltFeltMenFeilRegelverkRegel(rule),
};
