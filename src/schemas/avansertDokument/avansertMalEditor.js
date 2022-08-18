import TekstStyles from '../../util/TekstStyles';
import { SanityTyper } from '../../util/typer';
import { avansertDelmalAvsnitt } from '../avsnitt/avansertDelmalAvsnitt';
import { valgAvsnitt } from '../avsnitt/valgAvsnitt';
import decorators from '../../util/decorators';
import { htmlAvsnitt } from '../avsnitt/htmlAvsnitt';
import FlettefeltAnnontering from '../annonteringer/FlettefeltAnnontering';

export default (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    avansertDelmalAvsnitt(maalform),
    valgAvsnitt(maalform),
    {
      title: 'Tabell',
      type: SanityTyper.TABLE,
    },
    {
      type: 'block',
      marks: {
        annotations: [FlettefeltAnnontering()],
        decorators,
      },
      styles: TekstStyles,
    },
    htmlAvsnitt,
  ],
});
