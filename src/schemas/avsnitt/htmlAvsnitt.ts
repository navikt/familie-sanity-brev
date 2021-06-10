import { DokumentNavn, SanityTyper } from '../../util/typer';
import { AiOutlineUnorderedList } from 'react-icons/ai';

export const htmlAvsnitt = {
  name: DokumentNavn.HTMLFELT,
  type: SanityTyper.OBJECT,
  title: 'Htmlfelt',
  fields: [
    {
      name: DokumentNavn.HTMLFELT_REFERANSE,
      type: SanityTyper.REFERENCE,
      to: [{ type: DokumentNavn.HTMLFELT }],
      validation: Rule => [Rule.required().error('Tomt felt')],
    },
  ],
  preview: {
    prepare: () => ({
      media: AiOutlineUnorderedList,
    }),
  },
};
