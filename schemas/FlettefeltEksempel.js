import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { client } from "../utils/sanity";

const setResult = (result, key) => {
  sessionStorage.setItem(key, JSON.stringify(result.hits));
};

const ExternalLinkRenderer = (props) => {
  const feltId = props.felt._ref;
  const cachedHits = sessionStorage.getItem(feltId);
  console.log(cachedHits);
  const [felt, setFelt] = useState(
    cachedHits ? cachedHits : "LASTER FLETTEFELT"
  );

  useEffect(() => {
    if (props.felt) {
      if (cachedHits && cachedHits !== "undefined") {
        console.log(typeof cachedHits);
        //setFelt(JSON.parse(cachedHits));
      } else {
        client.fetch(`*[_id == "${feltId}"][0]`).then((res) => {
          res.felt && setFelt(res.felt);
          setResult(JSON.stringify(res.felt), feltId);
        });
      }
    } else {
      setFelt("TOMT FLETTEFELT");
    }
  }, []);

  return <span style={{ backgroundColor: "yellow" }}>{felt}</span>;
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
