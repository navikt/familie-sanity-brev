import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../../util/typer';
import {
  erEøsBegrunnelse,
  hentEØSTriggereRegler,
  kanVilkårsvurderingTriggereVelges,
} from './utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

export enum EøsVilkår {
  UNDER_18_ÅR = 'UNDER_18_ÅR',
  BOR_MED_SØKER = 'BOR_MED_SØKER',
  GIFT_PARTNERSKAP = 'GIFT_PARTNERSKAP',
  BOSATT_I_RIKET = 'BOSATT_I_RIKET',
  LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
  UTVIDET_BARNETRYGD = 'UTVIDET_BARNETRYGD',
}

const vilkårValg: Record<EøsVilkår, { title: string; value: EøsVilkår }> = {
  UNDER_18_ÅR: { title: 'Under 18 år', value: EøsVilkår.UNDER_18_ÅR },
  BOR_MED_SØKER: { title: 'Bor med søker', value: EøsVilkår.BOR_MED_SØKER },
  GIFT_PARTNERSKAP: { title: 'Gift partnerskap', value: EøsVilkår.GIFT_PARTNERSKAP },
  BOSATT_I_RIKET: { title: 'Bosatt i riket', value: EøsVilkår.BOSATT_I_RIKET },
  LOVLIG_OPPHOLD: { title: 'Lovlig opphold', value: EøsVilkår.LOVLIG_OPPHOLD },
  UTVIDET_BARNETRYGD: { title: 'Utvidet barnetrygd', value: EøsVilkår.UTVIDET_BARNETRYGD },
};

export const vilkårsvurderingTriggere = {
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
