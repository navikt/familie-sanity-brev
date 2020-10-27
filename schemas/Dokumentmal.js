import React, { useEffect, useState } from "react";
import FlettefeltAnnontering from "./annonteringer/FlettefeltAnnontering";
import SubmalAnnontering from "./annonteringer/SubmalAnnontering";
import ValgfeltAnnontering from "./annonteringer/ValgfeltAnnontering";

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
              FlettefeltAnnontering,
              SubmalAnnontering,
              ValgfeltAnnontering,
            ],
          },
        },
      ],
    },
  ],
};
