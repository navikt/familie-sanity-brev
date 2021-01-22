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
      fields: [
        ...DelmalFelter,
        {
          title: 'Er gjentagende',
          name: DokumentNavn.ER_GJENTAGENDE,
          type: SanityTyper.BOOLEAN,
          validation: Rule => [Rule.required().error('Må sette om delmalen er gjentagende')],
        },
      ],
      validation: Rule => [Rule.required().error('Ingen delmal valgt')],
      preview: {
        select: {
          _id: 'delmal._ref',
        },
        prepare: selection => selection,
        component: props => DelmalBlock(props, maalform, props.value._id),
      },
    },
    {
      title: 'Valgfelt',
      name: DokumentNavn.VALFELT_BLOCK,
      type: SanityTyper.OBJECT,
      fields: [
        ...ValgFelter,
        {
          title: 'Er gjentagende',
          name: DokumentNavn.ER_GJENTAGENDE,
          type: SanityTyper.BOOLEAN,
          validation: Rule => [Rule.required().error('Må sette om valgfeltet er gjentagende')],
        },
      ],
      validation: Rule => [Rule.required().error('Du må velge et valgfelt')],
      preview: {
        select: {
          title: 'valgfelt.id',
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
