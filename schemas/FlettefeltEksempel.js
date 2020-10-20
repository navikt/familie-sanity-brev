import React, { useEffect, useState } from "react";
import { client } from "../utils/sanity";

const ExternalLinkRenderer = (props) => {
  const feltId = props.felt?._ref;
  const cachedHits = sessionStorage.getItem(feltId);
  const [felt, setFelt] = useState(
    cachedHits ? cachedHits : "LASTER FLETTEFELT"
  );
  const hentFeltFraRemote = async (feltId) => {
    if (cachedHits) {
      return cachedHits;
    } else {
      return client.fetch(`*[_id == "${feltId}"][0]`).then((res) => {
        sessionStorage.setItem(feltId, res.felt);
        return res.felt;
      });
    }
  };

  useEffect(() => {
    if (props.felt) {
      hentFeltFraRemote(feltId).then((felt) => setFelt(felt));
    } else {
      setFelt("TOMT FLETTEFELT");
    }
  }, []);

  return (
    <span>
      {props.children}({felt})
    </span>
  );
};

export default {
  title: "Test flettefelt",
  name: "exlink",
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
                    name: "felt",
                    type: "reference",
                    to: [{ type: "flettefelt" }],
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
