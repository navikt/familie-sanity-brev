import { DokumentNavn, SanityTyper } from './typer';

export default {
  title: 'Flettefelt',
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.DOCUMENT,
  fields: [
    { title: 'Navn', name: DokumentNavn.FELT, type: SanityTyper.STRING },
    { title: 'Er liste', name: DokumentNavn.ER_LISTE, type: SanityTyper.BOOLEAN },
  ],
};
