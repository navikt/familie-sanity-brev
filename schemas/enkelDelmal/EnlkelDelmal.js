import HvorErDenIBruk from '../komponenter/HvorErDenIBruk';
import FlettefeltAnnontering from '../annonteringer/FlettefeltAnnontering';
import formaterTilCamelCase from '../../utils/formaterTilCamelCase';
import { DokumentNavn, SanityTyper } from '../typer';
import { Konstanter } from '../konstanter';

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        annotations: [FlettefeltAnnontering],
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
  title: 'Enkel delmal',
  name: 'enkelDelmal',
  type: 'document',
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
  fields: [
    {
      type: SanityTyper.STRING,
      title: 'Visningsnavn',
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
          .max(30)
          .error(`Api-navnet kan være på maksimalt ${Konstanter.API_MAX_LENGTH} tegn.`),
      ],
    },
    {
      title: 'Api-navn-forslag',
      type: 'slug',
      description:
        'Teknisk navn. Eksempel innhenteOpplysninger. Trykk på generate for å generere fra Visningsnavnet',
      name: DokumentNavn.API_NAVN + 'Forslag',
      options: { source: DokumentNavn.VISNINGSNAVN, slugify: formaterTilCamelCase },
      validation: Rule => [
        Rule.required().error('Dokumentet må ha et apiNavn'),
        Rule.required().custom(slug =>
          slug?.current.length > Konstanter.API_MAX_LENGTH
            ? `Api-navnet kan være på maksimalt ${Konstanter.API_MAX_LENGTH} tegn.`
            : true,
        ),
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
      name: 'mappe',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      title: 'Mappe-forslag',
      name: 'mappeForslag',
      type: 'array',
      of: [{ type: 'string' }],
    },
    editor('bokmaal', 'Bokmål'),
    editor('nynorsk', 'Nynorsk'),
  ],
};
