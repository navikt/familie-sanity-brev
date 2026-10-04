import decorators from '../../util/decorators';
import TekstStyles from '../../util/TekstStyles';
import { type DokumentNavn, SanityTyper } from '../../util/typer';
import FlettefeltAnnontering from '../annonteringer/FlettefeltAnnontering';
import { avansertDelmalAvsnitt } from '../avsnitt/avansertDelmalAvsnitt';
import { htmlAvsnitt } from '../avsnitt/htmlAvsnitt';
import { valgAvsnitt } from '../avsnitt/valgAvsnitt';
import { Fritekstområde } from './fritekstområde';

export default (maalform: DokumentNavn, tittel: string) => ({
    name: maalform,
    title: tittel,
    type: SanityTyper.ARRAY,
    of: [
        avansertDelmalAvsnitt(maalform),
        valgAvsnitt(maalform),
        {
            type: 'block',
            marks: {
                annotations: [FlettefeltAnnontering()],
                decorators,
            },
            styles: TekstStyles,
        },
        htmlAvsnitt,
        Fritekstområde,
    ],
});
