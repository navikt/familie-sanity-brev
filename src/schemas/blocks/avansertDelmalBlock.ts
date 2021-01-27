import { DokumentNavn, SanityTyper } from '../../util/typer';
import DelmalBlockComponent from '../../komponenter/DelmalBlockComponent';
import { AvansertDelmalFelter } from '../annonteringer/AvansertDelmalAnnontering';

export const avansertDelmalBlock = maalform => ({
  title: 'Delmal',
  name: DokumentNavn.DELMAL_BLOCK,
  type: SanityTyper.OBJECT,
  fields: [...AvansertDelmalFelter(true)],
  validation: Rule => [Rule.required().error('Ingen delmal valgt')],
  preview: {
    select: {
      _id: `${DokumentNavn.DELMAL_REFERANSE}._ref`,
    },
    prepare: selection => selection,
    component: props => DelmalBlockComponent(props, maalform, props.value._id),
  },
});
