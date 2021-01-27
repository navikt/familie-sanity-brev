import { DokumentNavn, SanityTyper } from '../../util/typer';
import NyttFelt from '../../komponenter/NyttFelt';
import FlettefeltBlockComponent from '../../komponenter/FlettefeltBlockComponent';

export const flettefeltBlock = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  title: 'Flettefelt',
  fields: [
    {
      name: DokumentNavn.FLETTEFELT_REFERANSE,
      type: SanityTyper.REFERENCE,
      to: [{ type: 'flettefelt' }],
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
      options: { filter: 'erListe == true' },
    },
    {
      name: 'lagNy',
      type: SanityTyper.STRING,
      description: 'En knapp for å lage nye flettefelt',
      inputComponent: props => NyttFelt(props, DokumentNavn.FLETTEFELT),
    },
  ],
  preview: {
    select: {
      _ref: `${DokumentNavn.FLETTEFELT_REFERANSE}._ref`,
    },
    prepare: selection => selection,
    component: props => {
      return FlettefeltBlockComponent(props.value._ref);
    },
  },
};
