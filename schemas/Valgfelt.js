import { DokumentNavn, SanityTyper } from './typer';

export default {
  title: 'Valgfelt',
  name: DokumentNavn.VALGFELT,
  type: SanityTyper.DOCUMENT,
  fields: [
    {
      title: 'Visningsnavn',
      name: DokumentNavn.ID,
      type: SanityTyper.STRING,
      validation: Rule => [Rule.required().error('Valgfeltet må ha et navn')],
    },
    {
      title: 'Api-navn',
      name: DokumentNavn.API_NAVN,
      type: SanityTyper.STRING,
      validation: Rule => [Rule.required().error('Valgfeltet må ha et navn')],
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
              validation: Rule => [Rule.required().error('Valgmuligheten må ha et navn')],
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
              delmal: 'delmal.id',
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
