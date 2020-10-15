import { FaPaperclip } from "react-icons/fa";
import ExternalLinkRenderer from "../components/ExternalLinkRenderer";

export default {
  name: "eksternLinkTest",
  title: "eksternLinkTest",
  type: "document",
  fields: [
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "link",
                blockEditor: {
                  render: ExternalLinkRenderer,
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
    },
  ],
};
