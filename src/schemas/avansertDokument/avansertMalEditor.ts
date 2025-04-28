import TekstStyles from '../../util/TekstStyles';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { avansertDelmalAvsnitt } from '../avsnitt/avansertDelmalAvsnitt';
import { valgAvsnitt } from '../avsnitt/valgAvsnitt';
import decorators from '../../util/decorators';
import { htmlAvsnitt } from '../avsnitt/htmlAvsnitt';
import FlettefeltAnnontering from '../annonteringer/FlettefeltAnnontering';
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
