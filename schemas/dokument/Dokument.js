import DelmalBlock from '../komponenter/DelmalBlock';
import FlettefeltAnnontering from '../annonteringer/enkelFlettefeltAnnontering';
import { DokumentNavn, SanityTyper } from '../typer';
import styles from '../../styles/myStyling.css';
import NyttFelt from '../komponenter/NyttFelt';
import React from 'react';
import FlettefeltBlock from '../komponenter/FlettefeltBlock';

const delmalBlock = maalform => ({
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: 'object',
  fields: [
    {
      title: 'Referanse til en delmal',
      name: DokumentNavn.DELMAL_REFERANSE,
      type: SanityTyper.REFERENCE,
      to: [{ type: DokumentNavn.DELMAL }],
      validation: Rule => [Rule.required().error('Fyll inn en enkel delmal.')],
    },
    {
      title: 'Delmalen skal alltid med',
      name: DokumentNavn.SKAL_ALLTID_MED,
      type: SanityTyper.BOOLEAN,
      description: 'Dersom denne er på kan systemet kan validere at denne alltid er med ',
      validation: Rule => [Rule.required().error('Velg om delmalen alltid skal med.')],
    },
    {
      name: 'lagNy',
      type: 'string',
      description: 'En knapp for å lage ny delmal',
      inputComponent: props => NyttFelt(props, DokumentNavn.DELMAL),
    },
  ],
  validation: Rule => [Rule.required().error('Ingen delmal valgt')],
  preview: {
    select: {
      _id: `${DokumentNavn.DELMAL_REFERANSE}._ref`,
    },
    prepare: selection => selection,
    component: props => {
      return DelmalBlock(props, maalform, props.value._id);
    },
  },
});

const flettefeltBlock = {
  name: DokumentNavn.FLETTEFELT,
  type: 'object',
  title: 'Flettefelt',
  fields: [
    {
      name: DokumentNavn.FLETTEFELT_REFERANSE,
      type: 'reference',
      to: [{ type: 'flettefelt' }],
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
      options: { filter: 'erListe == true' },
    },
    {
      name: 'lagNy',
      type: 'string',
      description: 'En knapp for å lage nye flettefelt',
      inputComponent: props => NyttFelt(props, DokumentNavn.FLETTEFELT),
    },
  ],
  preview: {
    select: {
      _ref: `${DokumentNavn.FLETTEFELT_REFERANSE}._ref`,
    },
    prepare: selection => selection,
    component: props => {
      return FlettefeltBlock(props.value._ref);
    },
  },
};

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: 'array',
  of: [
    delmalBlock(maalform),
    flettefeltBlock,
    {
      type: 'block',
      marks: {
        annotations: [FlettefeltAnnontering('erListe == false || !defined(erListe)')],
      },
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
      ],
    },
  ],
});

export default {
  title: 'Dokument',
  name: DokumentNavn.DOKUMENT,
  type: 'document',
  fields: [
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: Rule => [Rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Api navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: Rule => [
        Rule.required().error('Dokumentet må ha er apiNavn'),
        Rule.required().max(30),
      ],
    },
    { type: SanityTyper.STRING, title: 'Tittel bokmål', name: DokumentNavn.TITTEL_BOKMAAL },
    { type: SanityTyper.STRING, title: 'Tittel nynorsk', name: DokumentNavn.TITTEL_NYNORSK },

    editor('bokmaal', 'Bokmål'),
    editor('nynorsk', 'Nynorsk'),
  ],
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
};
