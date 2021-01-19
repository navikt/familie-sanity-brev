import Mal from './Mal';

export default {
  title: 'Avansert dokument',
  name: 'dokumentmal',
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

    Mal('bokmaal', 'Bokmål'),
    Mal('nynorsk', 'Nynorsk'),
  ],
};
