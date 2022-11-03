import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { borMedSøkerTriggerTyper, Vilkår, vilkårTriggerTilMenynavn } from '../typer';
import {
  erNasjonalEllerInstitusjonsBegrunnelse,
  lagUtfyltNasjonaltFeltMenFeilBehandlingstemaRegel,
} from '../utils';
import { lagInstitusjonBorMedSøkerRegel } from '../institusjon/utils';

export const borMedSøkerTriggere = {
  title: 'Triggere for "Bor med søker"',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.BOR_MED_SØKER_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: borMedSøkerTriggerTyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) =>
    !(
      erNasjonalEllerInstitusjonsBegrunnelse(document) &&
      document.vilkaar &&
      document.vilkaar.includes(Vilkår.BOR_MED_SOKER)
    ),
  validation: rule => [
    lagUtfyltNasjonaltFeltMenFeilBehandlingstemaRegel(rule),
    lagInstitusjonBorMedSøkerRegel(rule),
  ],
};
