import CaesarCipher from "../components/CaesarCipher";

export default {
  name: "test",
  type: "document",
  title: "Test",
  fields: [
    {
      name: "tittel",
      type: "string",
      title: "Submal navn",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "submal_block",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                type: "object",
                title: "Caesar",
                blockEditor: {
                  render: CaesarCipher,
                },
                fields: [
                  {
                    name: "url",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
      title: "Innhold",
    },
  ],
};
