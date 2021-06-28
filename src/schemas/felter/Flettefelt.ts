import { DokumentNavn, SanityTyper } from '../../util/typer';
import { apiNavnValideringer } from '../../util/valideringer';

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
      validation: apiNavnValideringer,
    },
    {
      title: 'Visningsnavn',
      name: DokumentNavn.FELT_VISNINGSNAVN,
      type: SanityTyper.STRING,
      description: 'Valgfritt visningsnavn.',
    },
    { title: 'Er liste', name: DokumentNavn.ER_LISTE, type: SanityTyper.BOOLEAN },
  ],
};
