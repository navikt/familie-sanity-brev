import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { borMedSøkerTriggerTyper, Vilkår, vilkårTriggerTilMenynavn } from './typer';
import { lagInstitusjonBorMedSøkerRegel } from './institusjon/utils';

export const borMedSøkerTriggere = {
  title: 'Triggere for "Bor med søker"',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.BOR_MED_SØKER_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: borMedSøkerTriggerTyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) =>
    !(document.vilkaar && document.vilkaar.includes(Vilkår.BOR_MED_SOKER)) &&
    !(document.eosVilkaar && document.eosVilkaar.includes(Vilkår.BOR_MED_SOKER)),
  validation: rule => [lagInstitusjonBorMedSøkerRegel(rule)],
};
