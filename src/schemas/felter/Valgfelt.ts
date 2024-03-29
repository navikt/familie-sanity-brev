import { DokumentNavn, SanityTyper } from '../../util/typer';
import { apiNavnValideringer, maskinnavnValideringer } from '../../util/valideringer';
import HvorErValgfeltetIBruk from '../../komponenter/HvorErDenIBruk/hvorErValgfeltetIBruk';

export default {
  title: 'Valgfelt',
  name: DokumentNavn.VALGFELT,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'Visningsnavn',
      name: DokumentNavn.VISNINGSNAVN,
      type: SanityTyper.STRING,
      validation: Rule => [Rule.required().error('Valgfeltet må ha et navn')],
    },
    {
      title: 'Api-navn',
      name: DokumentNavn.API_NAVN,
      type: SanityTyper.STRING,
      validation: rule => apiNavnValideringer(rule, DokumentNavn.VALGFELT),
    },
    {
      title: 'Beskrivelse',
      name: DokumentNavn.BESKRIVELSE,
      type: SanityTyper.STRING,
      description: 'Brukes av EF dersom det ønskes ekstra forklaring av feltet',
    },
    {
      name: 'hvorBrukesValgfeltet',
      type: SanityTyper.STRING,
      components: { input: HvorErValgfeltetIBruk },
    },
    {
      title: 'Muligheter',
      name: DokumentNavn.VALG,
      type: SanityTyper.ARRAY,
      of: [
        {
          type: 'object',
          fields: [
            {
              type: SanityTyper.STRING,
              name: DokumentNavn.VALGMULIGHET,
              title: 'Valgmulighet',
              validation: maskinnavnValideringer,
            },
            {
              type: SanityTyper.REFERENCE,
              to: [{ type: DokumentNavn.DELMAL }, { type: DokumentNavn.AVANSERT_DELMAL }],
              name: DokumentNavn.DELMAL,
              title: 'Delmal',
              validation: Rule => [Rule.required().error('Valgfeltet må ha en delmal')],
            },
          ],
          preview: {
            select: {
              title: 'valgmulighet',
              delmal: 'delmal.visningsnavn',
            },
            prepare(selection) {
              const { title, delmal } = selection;
              return {
                title: title,
                subtitle: `Peker på delmal: ${delmal ? delmal : 'ukjent'}`,
              };
            },
          },
        },
      ],
    },
  ],
};
