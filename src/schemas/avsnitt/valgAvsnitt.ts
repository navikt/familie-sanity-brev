import ValgfeltBlockComponent from '../../komponenter/ValgfeltBlockComponent';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { ValgFelter } from '../annonteringer/ValgAnnontering';

export const valgAvsnitt = (maalform: any) => ({
  title: 'Valgfelt',
  name: DokumentNavn.VALG_BLOCK,
  type: SanityTyper.OBJECT,
  fields: [...ValgFelter(true)],
  validation: (Rule: any) => [Rule.required().error('Du må velge et valgfelt')],
  preview: {
    select: {
      _id: `${DokumentNavn.VALG_REFERANSE}._ref`,
    },
  },
  components: {
    preview: (props: any) => ValgfeltBlockComponent(props._id, maalform),
  },
});
