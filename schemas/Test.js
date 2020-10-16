import React from "react";
import CaesarCipher from "../components/CaesarCipher";

const highlightIcon = () => <span style={{ fontWeight: "bold" }}>H</span>;
const highlightRender = (props) => (
  <span style={{ backgroundColor: "yellow" }}>{props.children}</span>
);

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
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              {
                title: "Variable",
                value: "variable",
                blockEditor: {
                  icon: highlightIcon,
                  render: highlightRender,
                },
              },
            ],
          },
        },
      ],
      title: "Innhold",
    },
  ],
};
