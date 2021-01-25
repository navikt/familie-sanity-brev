import { DokumentNavn, SanityTyper } from './typer';
import { erCamelCase } from './valideringer';

export default {
  title: 'Flettefelt',
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'Navn',
      name: DokumentNavn.FELT,
      type: SanityTyper.STRING,
      description:
        'Navnet på flettefeltet. Kan kun bestå av tall eller bokstaver. Eksempel: fødselsdatoBarn.',
      validation: Rule => [
        Rule.required().error('Dokumentet må ha et navn'),
        Rule.required().custom(erCamelCase),
      ],
    },
    { title: 'Er liste', name: DokumentNavn.ER_LISTE, type: SanityTyper.BOOLEAN },
  ],
};
