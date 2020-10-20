import React from "react";

const highlightIcon = () => <span style={{ fontWeight: "bold" }}>H</span>;
const highlightRender = (props) => (
  <span style={{ backgroundColor: "yellow" }}>{props.children}</span>
);

const flettefeltIcon = () => <span style={{ fontWeight: "bold" }}>F</span>;
const flettefeltRenderer = (props) => {
  console.log(props);
  return <span>FLETTEFELT</span>;
};

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
      name: "flettefelter",
      title: "Flettefelter",
      type: "reference",
      to: [{ type: "flettefelter" }],
    },
    {
      name: "submal_block",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            decorators: [
              {
                title: "Variable",
                value: "variable",
                blockEditor: {
                  icon: highlightIcon,
                  render: highlightRender,
                },
              },
            ],
            annotations: [
              {
                title: "Flettefelt",
                type: "object",
                value: "flettefelt",
                blockEditor: {
                  icon: flettefeltIcon,
                  render: flettefeltRenderer,
                },
                fields: [
                  {
                    title: "Flettefelt",
                    name: "flettefeltListe",
                    type: "reference",
                    to: [{ type: "flettefelt" }],
                    options: {
                      filter: ({ document }) => {
                        console.log(
                          "Relevante flettefelter",
                          document.flettefelter
                        );
                        ('*[_type=="flettefelter"][0]{felter[]->}');
                      },

                      filterParams: { ff: document.flettefelter },
                    },
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
