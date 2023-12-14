import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../../util/typer';
import {
  erEøsBegrunnelse,
  hentEØSTriggereRegler,
  kanVilkårsvurderingTriggereVelges,
} from './utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

export enum EøsVilkår {
  BOSATT_I_RIKET = 'BOSATT_I_RIKET',
  MEDLEMSKAP = 'MEDLEMSKAP',
  BARNEHAGEPLASS = 'BARNEHAGEPLASS',
  MEDLEMSKAP_ANNEN_FORELDER = 'MEDLEMSKAP_ANNEN_FORELDER',
  BARNETS_ALDER = 'BARNETS_ALDER',
  BOR_MED_SØKER = 'BOR_MED_SØKER',
  LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
}

const vilkårValg: Record<EøsVilkår, { title: string; value: EøsVilkår }> = {
  BOR_MED_SØKER: { title: 'Bor med søker', value: EøsVilkår.BOR_MED_SØKER },
  BOSATT_I_RIKET: { title: 'Bosatt i riket', value: EøsVilkår.BOSATT_I_RIKET },
  LOVLIG_OPPHOLD: { title: 'Lovlig opphold', value: EøsVilkår.LOVLIG_OPPHOLD },
  BARNEHAGEPLASS: { title: 'Barnehageplass', value: EøsVilkår.BARNEHAGEPLASS },
  BARNETS_ALDER: { title: 'Barnets alder', value: EøsVilkår.BARNETS_ALDER },
  MEDLEMSKAP: { title: 'Medlemskap', value: EøsVilkår.MEDLEMSKAP },
  MEDLEMSKAP_ANNEN_FORELDER: {
    title: 'Medlemskap annen forelder',
    value: EøsVilkår.MEDLEMSKAP_ANNEN_FORELDER,
  },
};

export const eøsVilkårsvurderingTriggere = {
  title: 'Vilkår',
  type: SanityTyper.ARRAY,
  name: EØSBegrunnelseDokumentNavn.VILKÅR,
  of: [
    {
      type: SanityTyper.STRING,
    },
  ],
  options: {
    list: Object.values(EøsVilkår).map(vilkår => vilkårValg[vilkår]),
  },

  hidden: ({ document }) =>
    !erEøsBegrunnelse(document) || !kanVilkårsvurderingTriggereVelges(document),
  validation: rule => hentEØSTriggereRegler(rule, true, [EØSTriggerType.VILKÅRSVURDERING]),
};
