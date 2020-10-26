import React, { useEffect, useState } from "react";
import { client } from "../utils/sanity";
import styles from "../styles/myStyling.css";

const hentFeltFraRemote = async (feltId, relevantFelt = "felt") => {
  const cachedHits = sessionStorage.getItem(feltId);
  if (cachedHits) {
    return cachedHits;
  } else {
    return client.fetch(`*[_id == "${feltId}"][0]`).then((res) => {
      sessionStorage.setItem(feltId, res[relevantFelt]);
      return res[relevantFelt];
    });
  }
};

const FlettefeltRenderer = (props) => {
  const feltId = props.felt?._ref;
  const cachedHits = sessionStorage.getItem(feltId);
  const [felt, setFelt] = useState(
    cachedHits ? cachedHits : "LASTER FLETTEFELT"
  );

  useEffect(() => {
    if (props.felt) {
      hentFeltFraRemote(feltId).then((felt) => setFelt(felt));
    } else {
      setFelt("TOMT FLETTEFELT");
    }
  }, []);

  return (
    <span className={styles.flettefelt}>
      {props.children}({felt})
    </span>
  );
};

const SubmalRenderer = (props) => {
  const feltId = props.submal?._ref;
  const cachedHits = sessionStorage.getItem(feltId);
  const [submal, setFelt] = useState(cachedHits ? cachedHits : "LASTER SUBMAL");

  useEffect(() => {
    if (props.submal) {
      hentFeltFraRemote(feltId, "tittel").then((submal) => setFelt(submal));
    } else {
      setFelt("TOMT SUBMALFELT");
    }
  }, []);

  return (
    <span className={styles.submal}>
      {props.children}({submal})
    </span>
  );
};

export default {
  title: "Dokumentmal",
  name: "dokumentmal",
  type: "document",
  preview: {
    select: {
      title: "tittel",
    },
  },
  fields: [
    { type: "string", title: "Tittel", name: "tittel" },
    {
      name: "innhold",
      title: "Innhold",
      type: "array",
      of: [
        {
          title: "Liste",
          name: "dokumentliste",
          type: "reference",
          to: [{ type: "dokumentmal" }],
        },
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "flettefelt",
                type: "object",
                title: "Flettefelt",
                blockEditor: {
                  icon: () => <span className={styles.flettefeltIcon}>F</span>,
                  render: FlettefeltRenderer,
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
                name: "submal",
                type: "object",
                title: "submal",
                blockEditor: {
                  icon: () => <span className={styles.submalIcon}>S</span>,
                  render: SubmalRenderer,
                },
                fields: [
                  {
                    name: "submal",
                    type: "reference",
                    to: [{ type: "dokumentmal" }],
                  },
                  {
                    title: "Skal med dersom:",
                    name: "skalMedFelt",
                    type: "reference",
                    description:
                      "Submalen kommer alltid med dersom dette feltet er tomt",
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
