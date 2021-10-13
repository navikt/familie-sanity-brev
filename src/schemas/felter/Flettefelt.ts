import { DokumentNavn, SanityTyper } from '../../util/typer';
import { apiNavnValideringer } from '../../util/valideringer';
import hvorErFlettefeltetIBruk from '../../komponenter/HvorErDenIBruk/hvorErFlettefeltetIBruk';

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
      validation: rule => apiNavnValideringer(rule, DokumentNavn.FLETTEFELT),
    },
    {
      title: 'Visningsnavn',
      name: DokumentNavn.FELT_VISNINGSNAVN,
      type: SanityTyper.STRING,
      description: 'Valgfritt visningsnavn.',
    },
    { title: 'Er liste', name: DokumentNavn.ER_LISTE, type: SanityTyper.BOOLEAN },
    { title: 'Er fritektsfelt', name: DokumentNavn.ER_FRITEKSTFELT, type: SanityTyper.BOOLEAN },
    {
      name: 'hvorBrukesFlettefeltet',
      type: SanityTyper.STRING,
      description:
        'Dette er et dummyfelt for å få vist komponenten som viser hvor flettefeltet er i bruk.',
      inputComponent: hvorErFlettefeltetIBruk,
    },
  ],
};
