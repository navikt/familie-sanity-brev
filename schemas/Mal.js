export default {
  name: "mal",
  type: "document",
  title: "Mal",
  fields: [
    {
      name: "mal_navn",
      type: "string",
      title: "Mal navn",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mal_tittel",
      type: "string",
      title: "Tittel",
      validation: (Rule) => Rule.required(),
    },
  ],
};
