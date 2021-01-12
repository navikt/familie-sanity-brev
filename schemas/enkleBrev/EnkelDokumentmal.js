import { EnkelDelmalReferanseFields } from './EnkelDelmalfields';
import DelmalBlock from '../componenter/DelmalBlock';
import FlettefeltAnnontering from '../annonteringer/FlettefeltAnnontering';

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: 'array',
  of: [
    {
      title: 'EnkelDelmal',
      name: 'enkelDelmalBlock',
      type: 'object',
      fields: [...EnkelDelmalReferanseFields],
      validation: Rule => [Rule.required().error('Ingen delmal valgt')],
      preview: {
        select: {
          _id: 'submal._ref',
        },
        prepare: selection => selection,
        component: props => DelmalBlock(props, maalform),
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
  title: 'Enkel dokumentmal',
  name: 'enkelDokumentmal',
  type: 'document',
  preview: {
    select: {
      title: 'id',
    },
  },
  fields: [
    {
      type: 'string',
      title: 'ID',
      name: 'id',
      validation: Rule => [Rule.required().error('Dokumentet må ha en Id')],
    },
    { type: 'string', title: 'Tittel bokmål', name: 'tittelBokmaal' },
    { type: 'string', title: 'Tittel nynorsk', name: 'tittelNynorsk' },

    editor('bokmaal', 'Bokmål'),
    editor('nynorsk', 'Nynorsk'),
  ],
};
