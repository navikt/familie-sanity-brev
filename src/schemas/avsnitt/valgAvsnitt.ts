import ValgfeltBlockComponent from '../../komponenter/ValgfeltBlockComponent';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { ValgFelter } from '../annonteringer/ValgAnnontering';

export const valgAvsnitt = maalform => ({
  title: 'Valgfelt',
  name: DokumentNavn.VALG_BLOCK,
  type: SanityTyper.OBJECT,
  fields: [...ValgFelter(true)],
  validation: Rule => [Rule.required().error('Du må velge et valgfelt')],
  preview: {
    select: {
      _id: `${DokumentNavn.VALG_REFERANSE}._ref`,
    },
    prepare: selection => selection,
    component: props => ValgfeltBlockComponent(props, maalform),
  },
});
