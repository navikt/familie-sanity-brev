import { DokumentNavn, SanityTyper } from '../../util/typer';
import { apiNavnValideringer } from '../../util/valideringer';
import { Rule } from 'sanity';

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
      validation: (rule: Rule) => apiNavnValideringer(rule, DokumentNavn.HTMLFELT),
    },
  ],
};
