import HvorErDenIBruk from '../komponenter/HvorErDenIBruk';
import FlettefeltAnnontering from '../annonteringer/FlettefeltAnnontering';
import TekstStyles from "../tekststyles/TekstStyles";

const editorFelter = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        annotations: [FlettefeltAnnontering],
      },
      styles: TekstStyles,
    },
  ],
  validation: Rule =>
    Rule.custom(hmm => {
      console.log('hmm', hmm);
      return true;
    }),
});

export default {
  title: 'Begrunnelse',
  name: 'begrunnelse',
  type: 'document',
  preview: {
    select: {
      title: 'id',
    },
  },
  fields: [
    {
      type: 'string',
      title: 'ID',
      name: 'id',
      validation: Rule => [Rule.required().error('Begrunnelsen må ha en Id')],
    },
    {
      name: 'hvorDenBrukes',
      type: 'string',
      description:
        'Dette er et dummyfelt for å få vist komponenten som viser hvor den delte teksten er i bruk',
      inputComponent: HvorErDenIBruk,
    },
    editorFelter('bokmaal', 'Bokmål'),
    editorFelter('nynorsk', 'Nynorsk'),
  ],
};
