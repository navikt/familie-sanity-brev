import { giftPartnerskapTriggerTyper, Vilkår, vilkårTriggerTilMenynavn } from '../typer';
import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import {
  erNasjonalEllerInstitusjonsBegrunnelse,
  lagUtfyltNasjonaltFeltMenFeilBehandlingstemaRegel,
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
      document.vilkaar.includes(Vilkår.GIFT_PARTNERSKAP)
    ),
  validation: rule => lagUtfyltNasjonaltFeltMenFeilBehandlingstemaRegel(rule),
};
