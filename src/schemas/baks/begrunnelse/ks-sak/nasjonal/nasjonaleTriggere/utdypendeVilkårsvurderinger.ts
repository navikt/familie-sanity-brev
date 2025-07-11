import { KSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../../util/typer';
import { erNasjonalBegrunnelse } from '../../eøs/eøsTriggere/utils';

export enum UtdypendeVilkårsvurderinger {
  VURDERING_ANNET_GRUNNLAG = 'VURDERING_ANNET_GRUNNLAG',
  DELT_BOSTED = 'DELT_BOSTED',
  BOSATT_PÅ_SVALBARD = 'BOSATT_PÅ_SVALBARD',
  DELT_BOSTED_SKAL_IKKE_DELES = 'DELT_BOSTED_SKAL_IKKE_DELES',
  ADOPSJON = 'ADOPSJON',
  SOMMERFERIE = 'SOMMERFERIE',
}

const utdypendeVilkårsvurderingerValg: Record<
  UtdypendeVilkårsvurderinger,
  { title: string; value: UtdypendeVilkårsvurderinger }
> = {
  VURDERING_ANNET_GRUNNLAG: {
    title: 'Vurdering annet grunnlag',
    value: UtdypendeVilkårsvurderinger.VURDERING_ANNET_GRUNNLAG,
  },
  DELT_BOSTED: {
    title: 'Delt bosted',
    value: UtdypendeVilkårsvurderinger.DELT_BOSTED,
  },
  DELT_BOSTED_SKAL_IKKE_DELES: {
    title: 'Delt bosted - skal ikke deles',
    value: UtdypendeVilkårsvurderinger.DELT_BOSTED_SKAL_IKKE_DELES,
  },
  BOSATT_PÅ_SVALBARD: {
    title: 'Bosatt på Svalbard',
    value: UtdypendeVilkårsvurderinger.BOSATT_PÅ_SVALBARD,
  },
  ADOPSJON: {
    title: 'Adopsjon',
    value: UtdypendeVilkårsvurderinger.ADOPSJON,
  },
  SOMMERFERIE: {
    title: 'Sommerferie',
    value: UtdypendeVilkårsvurderinger.SOMMERFERIE,
  },
};

export const utdypendeVilkårsvurderinger = {
  title: 'Utdypende vilkårsvurderinger',
  type: SanityTyper.ARRAY,
  name: KSBegrunnelseDokumentNavn.UTDYPENDE_VILKÅRSVURDERINGER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: Object.values(UtdypendeVilkårsvurderinger).map(
      trigger => utdypendeVilkårsvurderingerValg[trigger],
    ),
  },
  hidden: ({ document }) => !erNasjonalBegrunnelse(document),
};
