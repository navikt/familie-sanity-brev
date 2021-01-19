import HvorErDenIBruk from '../komponenter/HvorErDenIBruk';
import FlettefeltAnnontering from '../annonteringer/enkelFlettefeltAnnontering';
import { DokumentNavn, SanityTyper } from '../typer';
import { Konstanter } from '../konstanter';
import { flettefeltBlock } from '../dokument/Dokument';

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: 'array',
  of: [
    flettefeltBlock,
    {
      type: 'block',
      marks: {
        annotations: [FlettefeltAnnontering('erListe == false || !defined(erListe)')],
      },
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
      ],
    },
  ],
});

export default {
  title: 'Delmal',
  name: 'delmal',
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
      title: 'Api-navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: Rule => [
        Rule.required().error('Dokumentet må ha et apiNavn'),
        Rule.required()
          .max(Konstanter.API_NAME_MAX_LENGTH)
          .error(`Api-navnet kan være på maksimalt ${Konstanter.API_NAME_MAX_LENGTH} tegn.`),
      ],
    },
    {
      name: 'hvorDenBrukes',
      type: 'string',
      description:
        'Dette er et dummyfelt for å få vist komponenten som viser hvor den delte teksten er i bruk.',
      inputComponent: HvorErDenIBruk,
    },
    {
      title: 'Mappe',
      name: DokumentNavn.MAPPE,
      type: 'array',
      of: [{ type: 'string' }],
    },
    editor('bokmaal', 'Bokmål'),
    editor('nynorsk', 'Nynorsk'),
  ],
};
