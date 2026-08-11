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
      valgReferanse: DokumentNavn.VALG_REFERANSE,
    },
    prepare: (valgBlock: any) => ({
      valgfeltId: valgBlock?.valgReferanse?._ref,
    }),
  },
  components: {
    preview: (props: any) => ValgfeltBlockComponent(props.valgfeltId, maalform),
  },
});
