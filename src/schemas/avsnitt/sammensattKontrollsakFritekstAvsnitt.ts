import { DokumentNavn, SanityTyper } from '../../util/typer';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { SammensattKontrollsakFritekstBeskrivelse } from '../../komponenter/SammensattKontrollsakFritekstBeskrivelse';

export const sammensattKontrollsakFritekstAvsnitt = {
  name: DokumentNavn.SAMMENSATT_KONTROLLSAK_FRITEKST,
  type: SanityTyper.OBJECT,
  title: 'Sammensatt kontrollsak fritekst',
  fields: [
    {
      name: 'sammensattKontrollsakFritekstBeskrivelse',
      type: SanityTyper.STRING,
      components: { input: SammensattKontrollsakFritekstBeskrivelse },
    },
  ],
  preview: {
    prepare: () => ({
      media: AiOutlineUnorderedList,
      title: 'Sammensatt kontrollsak fritekst',
    }),
  },
};
