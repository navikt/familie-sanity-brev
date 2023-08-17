import { DokumentNavn, SanityTyper } from '../../util/typer';
import NyttFelt from '../../komponenter/NyttFelt';
import DelmalBlockComponent from '../../komponenter/DelmalBlockComponent';

export const delmalAvsnitt = maalform => ({
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: SanityTyper.OBJECT,
  fields: [
    {
      title: 'Referanse til delmal:',
      name: DokumentNavn.DELMAL_REFERANSE,
      type: SanityTyper.REFERENCE,
      to: [{ type: DokumentNavn.DELMAL }],
      validation: Rule => [Rule.required().error('Fyll inn en enkel delmal.')],
    },
    {
      title: 'Delmalen skal alltid med',
      name: DokumentNavn.SKAL_ALLTID_MED,
      type: SanityTyper.BOOLEAN,
      description: 'Dersom denne er på kan systemet kan validere at denne alltid er med ',
      validation: Rule => [Rule.required().error('Velg om delmalen alltid skal med.')],
    },
    {
      name: 'lagNy',
      type: SanityTyper.STRING,
      description: 'En knapp for å lage ny delmal',
      components: { input: props => NyttFelt(props, DokumentNavn.DELMAL) },
    },
  ],
  validation: Rule => [Rule.required().error('Ingen delmal valgt')],
  preview: {
    select: {
      _id: `${DokumentNavn.DELMAL_REFERANSE}._ref`,
    },
  },
  components: {
    preview: (props: any) => {
      return DelmalBlockComponent(props, maalform, props._id);
    },
  },
});
