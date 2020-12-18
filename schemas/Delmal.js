import Mal from "./Mal";
import HvorErDenIBruk from "./componenter/HvorErDenIBruk";

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
    {
      name: "hvorDenBrukes",
      type: "string",
      description:
        "Dette er et dummyfelt for å få vist komponenten som viser hvor den delte teksten er i bruk",
      inputComponent: HvorErDenIBruk,
    },
    {
      title: "Stikkord",
      name: "stikkord",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    Mal("bokmaal", "Bokmål"),
    Mal("nynorsk", "Nynorsk"),
  ],
};
