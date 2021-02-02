import { DokumentNavn, SanityTyper } from '../../util/typer';
import { førsteTegnErLitenBokstav, kunBokstaverOgTall } from '../../util/valideringer';

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
        Rule.required().error('Flettefeltet må ha et navn'),
        Rule.required().custom(førsteTegnErLitenBokstav),
        Rule.required().custom(kunBokstaverOgTall),
      ],
    },
    { title: 'Er liste', name: DokumentNavn.ER_LISTE, type: SanityTyper.BOOLEAN },
  ],
};
