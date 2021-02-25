import FlettefeltAnnontering from '../annonteringer/FlettefeltAnnontering';
import DelmalAnnontering from '../annonteringer/AvansertDelmalAnnontering';
import ValgAnnontering from '../annonteringer/ValgAnnontering';
import TekstStyles from '../../util/TekstStyles';
import { SanityTyper } from '../../util/typer';
import { avansertDelmalAvsnitt } from '../avsnitt/avansertDelmalAvsnitt';
import { valgAvsnitt } from '../avsnitt/valgAvsnitt';
import decorators from '../../util/decorators';

export default (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    avansertDelmalAvsnitt(maalform),
    valgAvsnitt(maalform),
    {
      type: 'block',
      marks: {
        annotations: [FlettefeltAnnontering(), DelmalAnnontering, ValgAnnontering],
        decorators,
      },
      styles: TekstStyles,
    },
  ],
});
