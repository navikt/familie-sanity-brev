import { DokumentNavn, SanityTyper } from '../../util/typer';
import NyttFelt from '../../komponenter/NyttFelt';
import FlettefeltBlockComponent from '../../komponenter/FlettefeltBlockComponent';

export const flettefeltAvsnitt = {
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
      components: {
        input: props => NyttFelt(props, DokumentNavn.FLETTEFELT),
      },
    },
  ],
  preview: {
    select: {
      flettefeltReferanse: `${DokumentNavn.FLETTEFELT_REFERANSE}`,
    },
  },
  components: {
    preview: (props: any) => {
      const ref = props?.flettefeltReferanse?._ref;

      return FlettefeltBlockComponent(ref);
    },
  },
};
