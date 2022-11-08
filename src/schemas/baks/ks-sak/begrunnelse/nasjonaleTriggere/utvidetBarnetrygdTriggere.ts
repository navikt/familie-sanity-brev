import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { utvidetBarnetrygdTriggertyper, Vilkår, vilkårTriggerTilMenynavn } from '../typer';
import { erEøsBegrunnelse } from '../eøs/eøsTriggere/utils';
import { hentNasjonaleTriggereRegler, erNasjonalBegrunnelse } from './utils';

export const utvidetBarnetrygdTriggere = {
  title: 'Utvidet barnetrygd triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.UTVIDET_BARNETRYGD_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: utvidetBarnetrygdTriggertyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) =>
    !(
      erNasjonalBegrunnelse(document) &&
      document.vilkaar &&
      document.vilkaar.includes(Vilkår.UTVIDET_BARNETRYGD)
    ) || erEøsBegrunnelse(document),
  validation: rule => hentNasjonaleTriggereRegler(rule),
};
