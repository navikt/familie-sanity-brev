import DelmalBlock from '../komponenter/DelmalBlock';
import FlettefeltAnnontering from '../annonteringer/enkelFlettefeltAnnontering';
import { DokumentNavn, SanityTyper } from '../typer';

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: 'array',
  of: [
    {
      title: 'EnkelDelmal',
      name: DokumentNavn.ENKEL_DELMAL_BLOCK,
      type: 'object',
      fields: [
        {
          title: 'Enkel Delmal',
          name: DokumentNavn.ENKEL_DELMAL_REFERANSE,
          type: SanityTyper.REFERENCE,
          to: [{ type: DokumentNavn.ENKEL_DELMAL }],
          validation: Rule => [Rule.required().error('Fyll inn en delmal')],
        },
        {
          title: 'Betingelse',
          name: DokumentNavn.BETINGELSE,
          type: SanityTyper.STRING,
          description: 'Delmalen kommer alltid med dersom dette feltet er tomt',
        },
      ],
      validation: Rule => [Rule.required().error('Ingen delmal valgt')],
      preview: {
        select: {
          _id: `${DokumentNavn.ENKEL_DELMAL_REFERANSE}._ref`,
        },
        prepare: selection => selection,
        component: props => {
          return DelmalBlock(props, maalform, props.value._id);
        },
      },
    },
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
  title: 'Dokument',
  name: DokumentNavn.DOKUMENT,
  type: 'document',
  fields: [
    {
      type: SanityTyper.STRING,
      title: 'Visningsnavn',
      name: DokumentNavn.VISNINGSNAVN,
      validation: Rule => [Rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Api navn',
      type: SanityTyper.STRING,
      name: 'apiNavn',
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: Rule => [
        Rule.required().error('Dokumentet må ha er apiNavn'),
        Rule.required().max(30),
      ],
    },
    { type: SanityTyper.STRING, title: 'Tittel bokmål', name: DokumentNavn.TITTEL_BOKMAAL },
    { type: SanityTyper.STRING, title: 'Tittel nynorsk', name: DokumentNavn.TITTEL_NYNORSK },

    editor('bokmaal', 'Bokmål'),
    editor('nynorsk', 'Nynorsk'),
  ],
  preview: {
    select: {
      title: 'visningsnavn',
    },
  },
};
