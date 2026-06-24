import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import {
  Begrunnelse,
  utvidetBarnetrygdTriggertyper,
  NasjonaleVilkår,
  vilkårTriggerTilMenynavn,
} from '../typer';
import { erEøsBegrunnelse } from '../eøs/eøsTriggere/utils';
import { hentNasjonaleTriggereRegler, erNasjonalBegrunnelse } from './utils';
import { Rule } from 'sanity';

export const utvidetBarnetrygdTriggere = {
  title: 'Utvidet barnetrygd triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.UTVIDET_BARNETRYGD_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: utvidetBarnetrygdTriggertyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }: { document: Begrunnelse }) =>
    !(
      erNasjonalBegrunnelse(document) &&
      document.vilkaar &&
      document.vilkaar.includes(NasjonaleVilkår.UTVIDET_BARNETRYGD)
    ) || erEøsBegrunnelse(document),
  validation: (rule: Rule) => hentNasjonaleTriggereRegler(rule),
};
