import FlettefeltAnnontering from '../annonteringer/FlettefeltAnnontering';
import DelmalAnnontering from '../annonteringer/AvansertDelmalAnnontering';
import ValgAnnontering from '../annonteringer/ValgAnnontering';
import TekstStyles from '../../util/TekstStyles';
import { SanityTyper } from '../../util/typer';
import { avansertDelmalBlock } from '../blocks/avansertDelmalBlock';
import { valgBlock } from '../blocks/valgBlock';

export default (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    avansertDelmalBlock(maalform),
    valgBlock,
    {
      type: 'block',
      marks: {
        annotations: [FlettefeltAnnontering(), DelmalAnnontering, ValgAnnontering],
      },
      styles: TekstStyles,
    },
  ],
});
