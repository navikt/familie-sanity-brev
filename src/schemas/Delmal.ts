import { Rule } from 'sanity';
import HvorErDelmalenIBruk from '../komponenter/HvorErDenIBruk/HvorErDelmalenIBruk';
import decorators from '../util/decorators';
import TekstStyles from '../util/TekstStyles';
import { DokumentNavn, SanityTyper } from '../util/typer';
import { apiNavnValideringer } from '../util/valideringer';
import FlettefeltAnnontering from './annonteringer/FlettefeltAnnontering';
import { flettefeltAvsnitt } from './avsnitt/flettefeltAvsnitt';
import { utbetalingerAvsnitt } from './avsnitt/utbetalingerAvsnitt';

const editor = (maalform: DokumentNavn, tittel: string) => ({
    name: maalform,
    title: tittel,
    type: SanityTyper.ARRAY,
    of: [
        flettefeltAvsnitt,
        utbetalingerAvsnitt,
        {
            type: SanityTyper.BLOCK,
            marks: {
                annotations: [FlettefeltAnnontering('erListe == false || !defined(erListe)')],
                decorators,
            },
            styles: TekstStyles,
        },
    ],
});

export default {
    title: 'Delmal',
    name: DokumentNavn.DELMAL,
    type: SanityTyper.DOCUMENT,
    preview: {
        select: {
            title: DokumentNavn.VISNINGSNAVN,
        },
    },
    fields: [
        {
            title: 'Visningsnavn',
            type: SanityTyper.STRING,
            name: DokumentNavn.VISNINGSNAVN,
            validation: (rule: Rule) => [rule.required().error('Dokumentet må ha et navn')],
        },
        {
            title: 'Api-navn',
            type: SanityTyper.STRING,
            name: DokumentNavn.API_NAVN,
            description: 'Teknisk navn. Eksempel innhenteOpplysninger',
            validation: (rule: Rule) => apiNavnValideringer(rule, DokumentNavn.DELMAL),
        },
        {
            name: 'hvorDenBrukes',
            type: SanityTyper.STRING,
            components: { input: HvorErDelmalenIBruk },
        },
        {
            title: 'Mappe',
            name: DokumentNavn.MAPPE,
            type: SanityTyper.ARRAY,
            of: [{ type: 'string' }],
        },
        editor(DokumentNavn.BOKMAAL, 'Bokmål'),
        editor(DokumentNavn.NYNORSK, 'Nynorsk'),
    ],
};
