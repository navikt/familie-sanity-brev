import FlettefeltAnnontering from './annonteringer/FlettefeltAnnontering';
import DelmalAnnontering, { DelmalFelter } from './annonteringer/DelmalAnnontering';
import ValgAnnontering, { ValgFelter } from './annonteringer/ValgAnnontering';
import DelmalBlock from './komponenter/DelmalBlock';
import TekstStyles from './tekststyles/TekstStyles';
import { DokumentNavn, SanityTyper } from './typer';

export default (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    {
      title: 'Delmal',
      name: DokumentNavn.DELMAL_BLOCK,
      type: SanityTyper.OBJECT,
      fields: [...DelmalFelter(true)],
      validation: Rule => [Rule.required().error('Ingen delmal valgt')],
      preview: {
        select: {
          _id: `${DokumentNavn.DELMAL_REFERANSE}._ref`,
        },
        prepare: selection => selection,
        component: props => DelmalBlock(props, maalform, props.value._id),
      },
    },
    {
      title: 'Valgfelt',
      name: DokumentNavn.VALG_BLOCK,
      type: SanityTyper.OBJECT,
      fields: [...ValgFelter(true)],
      validation: Rule => [Rule.required().error('Du må velge et valgfelt')],
      preview: {
        select: {
          title: `${DokumentNavn.VALG_BLOCK}.${DokumentNavn.VISNINGSNAVN}`,
        },
      },
    },
    {
      type: 'block',
      marks: {
        annotations: [FlettefeltAnnontering(), DelmalAnnontering, ValgAnnontering],
      },
      styles: TekstStyles,
    },
  ],
});
