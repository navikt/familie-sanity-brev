import { AiOutlineUnorderedList } from 'react-icons/ai';
import { DokumentNavn, SanityTyper } from '../../util/typer';

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
