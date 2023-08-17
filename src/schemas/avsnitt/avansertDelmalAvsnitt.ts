import { DokumentNavn, SanityTyper } from '../../util/typer';
import DelmalBlockComponent from '../../komponenter/DelmalBlockComponent';
import { AvansertDelmalFelter } from '../annonteringer/AvansertDelmalAnnontering';

export const avansertDelmalAvsnitt = maalform => ({
  title: 'Avansert delmal',
  name: DokumentNavn.DELMAL_BLOCK,
  type: SanityTyper.OBJECT,
  fields: [...AvansertDelmalFelter(true)],
  validation: Rule => [Rule.required().error('Ingen delmal valgt')],
  preview: {
    select: {
      _id: `${DokumentNavn.DELMAL_REFERANSE}._ref`,
    },
  },
  components: {
    preview: (props: any) => DelmalBlockComponent(props, maalform, props._id),
  },
});
