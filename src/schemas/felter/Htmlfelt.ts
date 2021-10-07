import { DokumentNavn, SanityTyper } from '../../util/typer';
import { apiNavnValideringer } from '../../util/valideringer';

export default {
  title: 'Htmlfelt',
  name: DokumentNavn.HTMLFELT,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'Navn',
      name: DokumentNavn.FELT,
      type: SanityTyper.STRING,
      description:
        'Navnet på htmlfeltet. Kan kun bestå av tall eller bokstaver. Eksempel: fødselsdatoBarn.',
      validation: rule => apiNavnValideringer(rule, DokumentNavn.HTMLFELT),
    },
  ],
};
