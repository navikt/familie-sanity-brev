import FlettefeltAnnontering from './annonteringer/FlettefeltAnnontering';
import { DokumentNavn, SanityTyper } from '../util/typer';
import { Konstanter } from '../util/konstanter';
import TekstStyles from '../util/TekstStyles';
import { delmalBlock } from './blocks/delmalBlock';
import { flettefeltBlock } from './blocks/flettefeltBlock';
import { peroideBlock } from './blocks/periodeBlock';

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    delmalBlock(maalform),
    flettefeltBlock,
    peroideBlock,
    {
      type: SanityTyper.BLOCK,
      marks: {
        annotations: [FlettefeltAnnontering('erListe == false || !defined(erListe)')],
      },
      styles: TekstStyles,
    },
  ],
});

export default {
  title: 'Dokument',
  name: DokumentNavn.DOKUMENT,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: Rule => [Rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Api navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: Rule => [
        Rule.required().error('Dokumentet må ha er apiNavn'),
        Rule.required().max(Konstanter.API_NAME_MAX_LENGTH),
      ],
    },
    { type: SanityTyper.STRING, title: 'Tittel bokmål', name: DokumentNavn.TITTEL_BOKMAAL },
    { type: SanityTyper.STRING, title: 'Tittel nynorsk', name: DokumentNavn.TITTEL_NYNORSK },

    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
};
