import FlettefeltAnnontering from './annonteringer/FlettefeltAnnontering';
import DelmalAnnontering, { DelmalFelter } from './annonteringer/DelmalAnnontering';
import ValgAnnontering, { ValgFelter } from './annonteringer/ValgAnnontering';
import DelmalBlock from './komponenter/DelmalBlock';
import TekstStyles from "./tekststyles/TekstStyles";

export default (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: 'array',
  of: [
    {
      title: 'Delmal',
      name: 'delmalBlock',
      type: 'object',
      fields: [...DelmalFelter],
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
      name: 'valgfeltBlock',
      type: 'object',
      fields: [
        ...ValgFelter,
        {
          title: 'Er gjentagende',
          name: 'erGjentagende',
          type: 'boolean',
          validation: Rule => [Rule.required().error('Må sette om delmalen er gjentagende')],
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
