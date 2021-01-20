import FlettefeltAnnontering from './annonteringer/FlettefeltAnnontering';
import DelmalAnnontering, { DelmalFelter } from './annonteringer/DelmalAnnontering';
import ValgAnnontering, { ValgFelter } from './annonteringer/ValgAnnontering';
import DelmalBlock from './komponenter/DelmalBlock';

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
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
      ],
    },
  ],
});
