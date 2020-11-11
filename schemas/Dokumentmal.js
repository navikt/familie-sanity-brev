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
      title: "id",
    },
  },
  fields: [
    { type: "string", title: "ID", name: "id" },
    { type: "string", title: "Tittel bokmål", name: "tittelBokmaal" },
    { type: "string", title: "Tittel nynorsk", name: "tittelNynorsk" },
    {
      name: "bokmaal",
      title: "Bokmål",
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
    {
      name: "nynorsk",
      title: "Nynorsk",
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
            { title: "Overskrift hoved", value: "h1" },
            { title: "Overskrift avsnitt", value: "h4" },
          ],
        },
      ],
    },
  ],
};
