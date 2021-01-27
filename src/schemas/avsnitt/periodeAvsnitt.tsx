import { DokumentNavn, SanityTyper } from '../../util/typer';
import { PeriodeBeskrivelse } from '../../komponenter/PeriodeBeskrivelse';
import { AiOutlineUnorderedList } from 'react-icons/ai';

export const peroideAvsnitt = {
  name: DokumentNavn.PERIODE,
  type: SanityTyper.OBJECT,
  title: 'Perioder',
  fields: [
    {
      name: 'periodeblokkbeskrivelse',
      type: SanityTyper.STRING,
      inputComponent: PeriodeBeskrivelse,
    },
  ],
  preview: {
    prepare: () => ({
      media: AiOutlineUnorderedList,
    }),
  },
};
