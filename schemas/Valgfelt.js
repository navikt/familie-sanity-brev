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
            {
              type: "string",
              name: "valgmulighet",
              title: "Valgmulighet",
              validation: (Rule) => [
                Rule.required().error("Valgmuligheten må ha et navnt"),
              ],
            },
            {
              type: "reference",
              to: [{ type: "delmal" }],
              name: "delmal",
              title: "Delmal",
              validation: (Rule) => [
                Rule.required().error("Valgfeltet må ha en delmal"),
              ],
            },
          ],
          preview: {
            select: {
              title: "valgmulighet",
              delmal: "delmal.id",
            },
            prepare(selection) {
              const { title, delmal } = selection;
              return {
                title: title,
                subtitle: `Peker på delmal: ${delmal ? delmal : "ukjent"}`,
              };
            },
          },
        },
      ],
    },
  ],
};
