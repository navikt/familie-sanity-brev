import Mal from './Mal';
import HvorErDenIBruk from './komponenter/HvorErDenIBruk';
import { DokumentNavn, SanityTyper } from './typer';
import { Konstanter } from './konstanter';

export default {
  title: 'Avansert delmal',
  name: 'avansertDelmal',
  type: 'document',
  preview: {
    select: {
      title: 'id',
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
    {
      name: 'hvorDenBrukes',
      type: 'string',
      description:
        'Dette er et dummyfelt for å få vist komponenten som viser hvor den delte teksten er i bruk',
      inputComponent: HvorErDenIBruk,
    },
    {
      title: 'Mappe',
      name: 'mappe',
      type: 'array',
      of: [{ type: 'string' }],
    },
    Mal('bokmaal', 'Bokmål'),
    Mal('nynorsk', 'Nynorsk'),
  ],
};
