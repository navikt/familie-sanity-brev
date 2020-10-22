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
  title: "Dokumentmal",
  name: "dokumentmal",
  type: "document",
  fields: [
    { type: "string", title: "Tittel", name: "tittel" },
    {
      name: "innhold",
      title: "Innhold",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "flettefelt",
                type: "object",
                title: "Flettefelt",
                blockEditor: {
                  icon: () => <span style={{ fontWeight: "bold" }}>F</span>,
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
              {
                name: "skalMedDersom",
                type: "object",
                title: "SkalMedDersom",
                blockEditor: {
                  icon: () => <span style={{ fontWeight: "bold" }}>S</span>,
                },
                fields: [
                  {
                    name: "skalMedFelt",
                    type: "reference",
                    to: [{ type: "skalMedDersomFelt" }],
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
