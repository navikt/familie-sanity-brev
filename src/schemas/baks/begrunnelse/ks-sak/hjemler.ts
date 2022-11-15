import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';

export const hjemlerValg = ['2', '3', '6', '7', '8', '9', '10', '12', '13', '14', '16'];

export const hjemler = {
  title: 'Hjemler',
  type: SanityTyper.ARRAY,
  name: BegrunnelseDokumentNavn.HJEMLER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    layout: 'grid',
    list: hjemlerValg.map(hjemmel => ({ value: hjemmel, title: `§${hjemmel}` })),
  },
};
