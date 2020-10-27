export default {
  title: "Valgfelt",
  name: "valgfelt",
  type: "document",
  fields: [
    { title: "Navn", name: "tittel", type: "string" },
    {
      title: "Muligheter",
      name: "valg",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { type: "string", name: "valgmulighet", title: "Valgmulighet" },
            {
              type: "reference",
              to: [{ type: "dokumentmal" }],
              name: "dokumentmal",
              title: "Dokumentmal",
            },
          ],
          preview: {
            select: {
              title: "valgmulighet",
              dokumentmal: "dokumentmal.tittel",
            },
            prepare(selection) {
              const { title, dokumentmal } = selection;
              return {
                title: title,
                subtitle: `Peker på dokumentmal: ${
                  dokumentmal ? dokumentmal : "ukjent"
                }`,
              };
            },
          },
        },
      ],
    },
  ],
};
