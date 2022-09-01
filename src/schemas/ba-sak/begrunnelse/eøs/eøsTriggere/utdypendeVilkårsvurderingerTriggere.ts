import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import {
  skalViseEøsTrigger,
  hentEØSTriggereRegler,
  kanVilkårsvurderingTriggereVelges,
} from './utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

enum UtdypendeVilkårsvurderingForEØS {
  BARN_BOR_I_STORBRITANNIA = 'BARN_BOR_I_STORBRITANNIA',
  BARN_BOR_I_STORBRITANNIA_MED_SØKER = 'BARN_BOR_I_STORBRITANNIA_MED_SØKER',
  BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER = 'BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER',
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
    !skalViseEøsTrigger(document) || !kanVilkårsvurderingTriggereVelges(document),
  validation: rule => hentEØSTriggereRegler(rule, false, [EØSTriggerType.VILKÅRSVURDERING]),
};
