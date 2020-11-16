import FlettefeltAnnontering from "./annonteringer/FlettefeltAnnontering";
import SubmalAnnontering from "./annonteringer/SubmalAnnontering";
import ValgfeltAnnontering from "./annonteringer/ValgfeltAnnontering";

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
      name: "bokmaal",
      title: "Bokmål",
      type: "array",
      of: [
        {
          title: "Liste",
          name: "dokumentliste",
          type: "reference",
          to: [{ type: "delmal" }],
          validation: (Rule) => [Rule.required().error("Tom Liste")],
        },
        {
          type: "block",
          marks: {
            annotations: [
              FlettefeltAnnontering,
              SubmalAnnontering,
              ValgfeltAnnontering,
            ],
          },
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "H6", value: "h6" },
          ],
        },
      ],
    },
    {
      name: "nynorsk",
      title: "Nynorsk",
      type: "array",
      of: [
        {
          title: "Liste",
          name: "dokumentliste",
          type: "reference",
          to: [{ type: "delmal" }],
          validation: (Rule) => [Rule.required().error("Tom Liste")],
        },
        {
          type: "block",
          marks: {
            annotations: [
              FlettefeltAnnontering,
              SubmalAnnontering,
              ValgfeltAnnontering,
            ],
          },
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Overskrift hoved", value: "h1" },
            { title: "Overskrift avsnitt", value: "h4" },
          ],
        },
      ],
    },
  ],
};
