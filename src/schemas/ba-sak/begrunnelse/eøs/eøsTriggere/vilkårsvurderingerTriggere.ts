import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import {
  skalViseEøsTrigger,
  hentEØSTriggereRegler,
  kanVilkårsvurderingTriggereVelges,
} from './utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

export enum Vilkår {
  UNDER_18_ÅR = 'UNDER_18_ÅR',
  BOR_MED_SØKER = 'BOR_MED_SØKER',
  GIFT_PARTNERSKAP = 'GIFT_PARTNERSKAP',
  BOSATT_I_RIKET = 'BOSATT_I_RIKET',
  LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
  UTVIDET_BARNETRYGD = 'UTVIDET_BARNETRYGD',
}

const vilkårValg: Record<Vilkår, { title: string; value: Vilkår }> = {
  UNDER_18_ÅR: { title: 'Under 18 år', value: Vilkår.UNDER_18_ÅR },
  BOR_MED_SØKER: { title: 'Bor med søker', value: Vilkår.BOR_MED_SØKER },
  GIFT_PARTNERSKAP: { title: 'Gift partnerskap', value: Vilkår.GIFT_PARTNERSKAP },
  BOSATT_I_RIKET: { title: 'Bosatt i riket', value: Vilkår.BOSATT_I_RIKET },
  LOVLIG_OPPHOLD: { title: 'Lovlig opphold', value: Vilkår.LOVLIG_OPPHOLD },
  UTVIDET_BARNETRYGD: { title: 'Utvidet barnetrygd', value: Vilkår.UTVIDET_BARNETRYGD },
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
    list: Object.values(Vilkår).map(vilkår => vilkårValg[vilkår]),
  },

  hidden: ({ document }) =>
    !skalViseEøsTrigger(document) || !kanVilkårsvurderingTriggereVelges(document),
  validation: rule => hentEØSTriggereRegler(rule, true, [EØSTriggerType.VILKÅRSVURDERING]),
};
