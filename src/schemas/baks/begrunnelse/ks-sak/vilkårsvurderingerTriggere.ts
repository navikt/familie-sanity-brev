import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';

export enum Vilkår {
  BOSATT_I_RIKET = 'BOSATT_I_RIKET',
  MEDLEMSKAP = 'MEDLEMSKAP',
  BARNEHAGEPLASS = 'BARNEHAGEPLASS',
  MEDLEMSKAP_ANNEN_FORELDER = 'MEDLEMSKAP_ANNEN_FORELDER',
  BARNETS_ALDER = 'BARNETS_ALDER',
  BOR_MED_SØKER = 'BOR_MED_SØKER',
}

const vilkårValg: Record<Vilkår, { title: string; value: Vilkår }> = {
  BOSATT_I_RIKET: { title: 'Bosatt i riket', value: Vilkår.BOSATT_I_RIKET },
  MEDLEMSKAP: {
    title: 'Medlemskap',
    value: Vilkår.MEDLEMSKAP,
  },
  BARNEHAGEPLASS: {
    title: 'Barnehageplass',
    value: Vilkår.BARNEHAGEPLASS,
  },
  MEDLEMSKAP_ANNEN_FORELDER: {
    title: 'Medlemskap annen forelder',
    value: Vilkår.MEDLEMSKAP_ANNEN_FORELDER,
  },
  BOR_MED_SØKER: { title: 'Bor med søker', value: Vilkår.BOR_MED_SØKER },
  BARNETS_ALDER: {
    title: 'Barnets alder',
    value: Vilkår.BARNETS_ALDER,
  },
};

export const vilkårsvurderingTriggere = {
  title: 'Vilkår',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.VILKÅR,
  of: [
    {
      type: SanityTyper.STRING,
    },
  ],
  options: {
    list: Object.values(Vilkår).map(vilkår => vilkårValg[vilkår]),
  },
};
