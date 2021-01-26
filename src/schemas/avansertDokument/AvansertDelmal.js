import editor from './avansertMalEditor';
import HvorErDenIBruk from '../../komponenter/HvorErDenIBruk';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { Konstanter } from '../../util/konstanter';

export default {
  title: 'Avansert delmal',
  name: DokumentNavn.AVANSERT_DELMAL,
  type: SanityTyper.DOCUMENT,
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
      validation: Rule => [Rule.required().error('Dokumentet må ha et visningsnavn')],
    },
    {
      title: 'Api navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: Rule => [
        Rule.required().error('Dokumentet må ha et apiNavn'),
        Rule.required().max(Konstanter.API_NAME_MAX_LENGTH),
      ],
    },
    {
      name: 'hvorDenBrukes',
      type: SanityTyper.STRING,
      description:
        'Dette er et dummyfelt for å få vist komponenten som viser hvor den delte teksten er i bruk',
      inputComponent: HvorErDenIBruk,
    },
    {
      title: 'Mappe',
      name: DokumentNavn.MAPPE,
      type: SanityTyper.ARRAY,
      of: [{ type: 'string' }],
    },
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};
