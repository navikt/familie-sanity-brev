import { DokumentNavn, SanityTyper } from '../../util/typer';
import { ValgFelter } from '../annonteringer/ValgAnnontering';

export const valgBlock = {
  title: 'Valgfelt',
  name: DokumentNavn.VALG_BLOCK,
  type: SanityTyper.OBJECT,
  fields: [...ValgFelter(true)],
  validation: Rule => [Rule.required().error('Du må velge et valgfelt')],
  preview: {
    select: {
      title: `${DokumentNavn.VALG_BLOCK}.${DokumentNavn.VISNINGSNAVN}`,
    },
  },
};
