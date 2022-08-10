import TekstStyles from '../../util/TekstStyles';
import { SanityTyper } from '../../util/typer';
import { avansertDelmalAvsnitt } from '../avsnitt/avansertDelmalAvsnitt';
import { valgAvsnitt } from '../avsnitt/valgAvsnitt';
import decorators from '../../util/decorators';
import { htmlAvsnitt } from '../avsnitt/htmlAvsnitt';

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
        decorators,
      },
      styles: TekstStyles,
    },
    htmlAvsnitt,
  ],
});
