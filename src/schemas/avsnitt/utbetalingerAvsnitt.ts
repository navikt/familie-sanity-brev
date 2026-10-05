import { AiOutlineUnorderedList } from 'react-icons/ai';
import { UtbetalingerBeskrivelse } from '../../komponenter/UtbetalingerBeskrivelse';
import { DokumentNavn, SanityTyper } from '../../util/typer';

export const utbetalingerAvsnitt = {
    name: DokumentNavn.UTBETALINGER,
    type: SanityTyper.OBJECT,
    title: 'Utbetalinger',
    fields: [
        {
            name: 'utbetalingerbeskrivelse',
            type: SanityTyper.STRING,
            components: { input: UtbetalingerBeskrivelse },
        },
    ],
    preview: {
        prepare: () => ({
            media: AiOutlineUnorderedList,
            title: 'Utbetalinger',
        }),
    },
};
