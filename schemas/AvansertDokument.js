import Mal from './Mal';
import { DokumentNavn, SanityTyper } from './typer';
import { Konstanter } from './konstanter';

export default {
  title: 'Avansert dokument',
  name: 'dokumentmal',
  type: 'document',
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
  fields: [
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: Rule => [Rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Api navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: Rule => [
        Rule.required().error('Dokumentet må ha er apiNavn'),
        Rule.required().max(Konstanter.API_NAME_MAX_LENGTH),
      ],
    },
    { type: 'string', title: 'Tittel bokmål', name: 'tittelBokmaal' },
    { type: 'string', title: 'Tittel nynorsk', name: 'tittelNynorsk' },

    Mal('bokmaal', 'Bokmål'),
    Mal('nynorsk', 'Nynorsk'),
  ],
};
