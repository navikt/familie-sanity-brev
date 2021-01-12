import HvorErDenIBruk from '../componenter/HvorErDenIBruk';
import FlettefeltAnnontering from '../annonteringer/FlettefeltAnnontering';

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
      title: 'id',
    },
  },
  fields: [
    {
      type: 'string',
      title: 'ID',
      name: 'id',
      validation: Rule => [Rule.required().error('Delmalen må ha en Id')],
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
      name: 'stikkord',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    editor('bokmaal', 'Bokmål'),
    editor('nynorsk', 'Nynorsk'),
  ],
};
