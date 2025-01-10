import { DokumentNavn, SanityTyper } from '../../util/typer';
import { AiOutlineUnorderedList } from 'react-icons/ai';

export const fritekstAvsnitt = {
  name: DokumentNavn.FRITEKST,
  type: SanityTyper.OBJECT,
  title: 'Fritekst',
  fields: [
    {
      name: '',
      type: SanityTyper.STRING,
      components: { input: () => 'Fritekstfelt som ivaretar linjeskift' },
    },
  ],
  preview: {
    prepare: () => ({
      media: AiOutlineUnorderedList,
      title: 'Fritekst',
    }),
  },
};
