import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { EøsVilkår } from './eøs/eøsTriggere/vilkårsvurderingerTriggere';
import { NasjonaleVilkår } from './typer';
import { lagInstitusjonBorMedSøkerRegel } from './institusjon/utils';

export enum BorMedSøkerTriggere {
  VURDERING_ANNET_GRUNNLAG = 'VURDERING_ANNET_GRUNNLAG',
  DELT_BOSTED = 'DELT_BOSTED',
  DELT_BOSTED_SKAL_IKKE_DELES = 'DELT_BOSTED_SKAL_IKKE_DELES',
  FAST_BOSTED = 'FAST_BOSTED',
}

const vilkårTriggerTilMenynavn: Record<BorMedSøkerTriggere, { title: string; value: string }> = {
  DELT_BOSTED: {
    title: 'Delt bosted: skal deles',
    value: BorMedSøkerTriggere.DELT_BOSTED,
  },
  DELT_BOSTED_SKAL_IKKE_DELES: {
    title: 'Delt bosted: skal ikke deles',
    value: BorMedSøkerTriggere.DELT_BOSTED_SKAL_IKKE_DELES,
  },
  VURDERING_ANNET_GRUNNLAG: {
    title: 'Vurdering annet grunnlag',
    value: BorMedSøkerTriggere.VURDERING_ANNET_GRUNNLAG,
  },
  FAST_BOSTED: {
    title: 'Fast bosted',
    value: BorMedSøkerTriggere.FAST_BOSTED,
  },
};

export const borMedSøkerTriggere = {
  title: 'Triggere for "Bor med søker"',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.BOR_MED_SØKER_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: Object.values(BorMedSøkerTriggere).map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) =>
    !(document.vilkaar && document.vilkaar.includes(NasjonaleVilkår.BOR_MED_SOKER)) &&
    !(document.eosVilkaar && document.eosVilkaar.includes(EøsVilkår.BOR_MED_SØKER)),
  validation: rule => [lagInstitusjonBorMedSøkerRegel(rule)],
};
