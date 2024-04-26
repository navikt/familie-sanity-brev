import FlettefeltAnnontering from './annonteringer/FlettefeltAnnontering';
import { DokumentNavn, SanityTyper } from '../util/typer';
import TekstStyles from '../util/TekstStyles';
import { delmalAvsnitt } from './avsnitt/delmalAvsnitt';
import { flettefeltAvsnitt } from './avsnitt/flettefeltAvsnitt';
import { peroideAvsnitt } from './avsnitt/periodeAvsnitt';
import decorators from '../util/decorators';
import { apiNavnValideringer } from '../util/valideringer';
import { utbetalingerAvsnitt } from './avsnitt/utbetalingerAvsnitt';

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    delmalAvsnitt(maalform),
    flettefeltAvsnitt,
    peroideAvsnitt,
    utbetalingerAvsnitt,
    {
      type: SanityTyper.BLOCK,
      marks: {
        annotations: [FlettefeltAnnontering('erListe == false || !defined(erListe)')],
        decorators,
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
      validation: rule => apiNavnValideringer(rule, DokumentNavn.DOKUMENT),
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
