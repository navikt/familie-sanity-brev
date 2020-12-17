import FlettefeltAnnontering from "./annonteringer/FlettefeltAnnontering";
import SubmalAnnontering from "./annonteringer/SubmalAnnontering";
import ValgfeltAnnontering from "./annonteringer/ValgfeltAnnontering";

export default (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: "array",
  of: [
    {
      title: "Liste",
      name: "dokumentliste",
      type: "reference",
      description: "En liste med fler av samme delmal eller valgfelt.",
      to: [{ type: "delmal" }, { type: "valgfelt" }],
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
});
