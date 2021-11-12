import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { utvidetBarnetrygdTriggertyper, Vilkår, vilkårTriggerTilMenynavn } from '../typer';

export const utvidetBarnetrygdTriggere = {
  title: 'Utvidet barnetrygd triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.UTVIDET_BARNETRYGD_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: utvidetBarnetrygdTriggertyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) =>
    !(document.vilkaar && document.vilkaar.includes(Vilkår.UTVIDET_BARNETRYGD)),
};
