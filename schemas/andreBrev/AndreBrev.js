import EnkelMal from './EnkelMal';

export default {
  title: 'Andre brev',
  name: 'andreBrev',
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

    EnkelMal('bokmaal', 'Bokmål'),
    EnkelMal('nynorsk', 'Nynorsk'),
  ],
};
