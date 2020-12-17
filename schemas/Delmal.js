import Mal from "./Mal";

export default {
  title: "Delmal",
  name: "delmal",
  type: "document",
  preview: {
    select: {
      title: "id",
    },
  },
  fields: [
    {
      type: "string",
      title: "ID",
      name: "id",
      validation: (Rule) => [Rule.required().error("Delmalen må ha en Id")],
    },
    Mal("bokmaal", "Bokmål"),
    Mal("nynorsk", "Nynorsk"),
  ],
};
