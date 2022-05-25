import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { utvidetBarnetrygdTriggertyper, Vilkår, vilkårTriggerTilMenynavn } from '../typer';
import { erEøsBegrunnelse } from '../EØSTriggere/utlis';
import { hentNasjonaleTriggereRegler } from './utils';

export const utvidetBarnetrygdTriggere = {
  title: 'Utvidet barnetrygd triggere',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.UTVIDET_BARNETRYGD_TRIGGERE,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: utvidetBarnetrygdTriggertyper.map(trigger => vilkårTriggerTilMenynavn[trigger]),
  },
  hidden: ({ document }) =>
    !(document.vilkaar && document.vilkaar.includes(Vilkår.UTVIDET_BARNETRYGD)) ||
    erEøsBegrunnelse(document),
  validation: rule => hentNasjonaleTriggereRegler(rule),
};
