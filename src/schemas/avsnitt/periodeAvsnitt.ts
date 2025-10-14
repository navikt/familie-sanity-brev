import { DokumentNavn, SanityTyper } from '../../util/typer';
import { PeriodeBeskrivelse } from '../../komponenter/PeriodeBeskrivelse';
import { AiOutlineUnorderedList } from 'react-icons/ai';

export const peroideAvsnitt = {
  name: DokumentNavn.PERIODER,
  type: SanityTyper.OBJECT,
  title: 'Perioder',
  fields: [
    {
      name: 'periodeblokkbeskrivelse',
      type: SanityTyper.STRING,
      components: { input: PeriodeBeskrivelse },
    },
  ],
  preview: {
    prepare: () => ({
      media: AiOutlineUnorderedList,
      title: 'Perioder',
    }),
  },
};
