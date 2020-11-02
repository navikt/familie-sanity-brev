import React, { useEffect, useState } from "react";
import FlettefeltAnnontering from "./annonteringer/FlettefeltAnnontering";
import SubmalAnnontering from "./annonteringer/SubmalAnnontering";
import ValgfeltAnnontering from "./annonteringer/ValgfeltAnnontering";
import styles from "../styles/myStyling.css";

const TittelStyle = props => (
  <h3 className={styles.tittel}>{props.children}</h3>
)

export default {
  title: "Dokumentmal",
  name: "dokumentmal",
  type: "document",
  preview: {
    select: {
      title: "id",
    },
  },
  fields: [
    { type: "string", title: "ID", name: "id" },
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
              FlettefeltAnnontering,
              SubmalAnnontering,
              ValgfeltAnnontering,
            ],
          },
          styles: [
            { title: "Normal", value: "normal" },
            {
              title: "Tittel",
              value: "tittel",
              blockEditor: {
                render: TittelStyle,
              },
            },
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
  ],
};
