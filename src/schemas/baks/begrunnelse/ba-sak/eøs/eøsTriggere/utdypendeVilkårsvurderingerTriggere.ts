import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../../util/typer';
import {
  erEøsBegrunnelse,
  hentEØSTriggereRegler,
  kanVilkårsvurderingTriggereVelges,
} from './utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

enum UtdypendeVilkårsvurderingForEØS {
  BARN_BOR_I_STORBRITANNIA = 'BARN_BOR_I_STORBRITANNIA',
  BARN_BOR_I_STORBRITANNIA_MED_SØKER = 'BARN_BOR_I_STORBRITANNIA_MED_SØKER',
  BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER = 'BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER',
  BARN_BOR_I_EØS = 'BARN_BOR_I_EØS',
  BARN_BOR_I_EØS_MED_SØKER = 'BARN_BOR_I_EØS_MED_SØKER',
  BARN_BOR_I_EØS_MED_ANNEN_FORELDER = 'BARN_BOR_I_EØS_MED_ANNEN_FORELDER',
  BARN_BOR_I_NORGE = 'BARN_BOR_I_NORGE',
  BARN_BOR_I_NORGE_MED_SØKER = 'BARN_BOR_I_NORGE_MED_SØKER',
  BARN_BOR_ALENE_I_ANNET_EØS_LAND = 'BARN_BOR_ALENE_I_ANNET_EØS_LAND',
}

const KompetanseValg: Record<
  UtdypendeVilkårsvurderingForEØS,
  { title: string; value: UtdypendeVilkårsvurderingForEØS }
> = {
  BARN_BOR_I_STORBRITANNIA: {
    title: 'Barn bor i Storbritannia',
    value: UtdypendeVilkårsvurderingForEØS.BARN_BOR_I_STORBRITANNIA,
  },
  BARN_BOR_I_STORBRITANNIA_MED_SØKER: {
    title: 'Barn bor i Storbritannia med søker',
    value: UtdypendeVilkårsvurderingForEØS.BARN_BOR_I_STORBRITANNIA_MED_SØKER,
  },
  BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER: {
    title: 'Barn bor i Storbritannia med annen forelder',
    value: UtdypendeVilkårsvurderingForEØS.BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER,
  },
  BARN_BOR_I_EØS: {
    title: 'Barn bor i EØS',
    value: UtdypendeVilkårsvurderingForEØS.BARN_BOR_I_EØS,
  },
  BARN_BOR_I_EØS_MED_SØKER: {
    title: 'Barn bor i EØS med søker',
    value: UtdypendeVilkårsvurderingForEØS.BARN_BOR_I_EØS_MED_SØKER,
  },
  BARN_BOR_I_EØS_MED_ANNEN_FORELDER: {
    title: 'Barn bor i EØS med annen forelder',
    value: UtdypendeVilkårsvurderingForEØS.BARN_BOR_I_EØS_MED_ANNEN_FORELDER,
  },
  BARN_BOR_I_NORGE: {
    title: 'Barn bor i Norge',
    value: UtdypendeVilkårsvurderingForEØS.BARN_BOR_I_NORGE,
  },
  BARN_BOR_I_NORGE_MED_SØKER: {
    title: 'Barn bor i Norge med søker',
    value: UtdypendeVilkårsvurderingForEØS.BARN_BOR_I_NORGE_MED_SØKER,
  },
  BARN_BOR_ALENE_I_ANNET_EØS_LAND: {
    title: 'Barn bor alene i annet EØS-land',
    value: UtdypendeVilkårsvurderingForEØS.BARN_BOR_ALENE_I_ANNET_EØS_LAND,
  },
};

export const utdypendeVilkårsvurderingerForEØSTriggere = {
  title: 'Utdypende vilkårsvurderinger',
  type: SanityTyper.ARRAY,
  name: EØSBegrunnelseDokumentNavn.UTDYPENDE_VILKÅRSVURDERINGER,
  of: [
    {
      type: SanityTyper.STRING,
    },
  ],
  options: {
    list: Object.values(UtdypendeVilkårsvurderingForEØS).map(
      utdypendeVilkårsvurderingForEøs => KompetanseValg[utdypendeVilkårsvurderingForEøs],
    ),
  },

  hidden: ({ document }) =>
    !erEøsBegrunnelse(document) || !kanVilkårsvurderingTriggereVelges(document),
  validation: rule => hentEØSTriggereRegler(rule, false, [EØSTriggerType.VILKÅRSVURDERING]),
};
