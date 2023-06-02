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
  },
  components: {
    preview: (props: any) => ValgfeltBlockComponent(props._id, maalform),
  },
});
