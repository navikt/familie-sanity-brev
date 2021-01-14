import FlettefeltAnnontering from './annonteringer/FlettefeltAnnontering';
import SubmalAnnontering, { DelmalFeltFields } from './annonteringer/SubmalAnnontering';
import ValgfeltAnnontering, { ValgfeltFields } from './annonteringer/ValgfeltAnnontering';
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
      fields: [
        ...DelmalFeltFields,
        {
          title: 'Er gjentagende',
          name: 'erGjentagende',
          type: 'boolean',
          validation: Rule => [Rule.required().error('Må sette om delmalen er gjentagende')],
        },
      ],
      validation: Rule => [Rule.required().error('Ingen delmal valgt')],
      preview: {
        select: {
          _id: 'submal._ref',
        },
        prepare: selection => selection,
        component: props => DelmalBlock(props, maalform),
      },
    },
    {
      title: 'Valgfelt',
      name: 'valgfeltBlock',
      type: 'object',
      fields: [
        ...ValgfeltFields,
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
        annotations: [FlettefeltAnnontering, SubmalAnnontering, ValgfeltAnnontering],
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
