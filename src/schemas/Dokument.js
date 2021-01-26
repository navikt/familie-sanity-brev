import DelmalBlock from '../komponenter/DelmalBlock';
import FlettefeltAnnontering from './annonteringer/FlettefeltAnnontering';
import { DokumentNavn, SanityTyper } from '../util/typer';
import NyttFelt from '../komponenter/NyttFelt';
import FlettefeltBlock from '../komponenter/FlettefeltBlock';
import { Konstanter } from '../util/konstanter';
import TekstStyles from '../util/TekstStyles';

const delmalBlock = maalform => ({
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
  type: SanityTyper.OBJECT,
  fields: [
    {
      title: 'Referanse til delmal:',
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
      type: SanityTyper.STRING,
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

export const flettefeltBlock = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  title: 'Flettefelt',
  fields: [
    {
      name: DokumentNavn.FLETTEFELT_REFERANSE,
      type: SanityTyper.REFERENCE,
      to: [{ type: 'flettefelt' }],
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
      options: { filter: 'erListe == true' },
    },
    {
      name: 'lagNy',
      type: SanityTyper.STRING,
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
  type: SanityTyper.ARRAY,
  of: [
    delmalBlock(maalform),
    flettefeltBlock,
    {
      type: SanityTyper.BLOCK,
      marks: {
        annotations: [FlettefeltAnnontering('erListe == false || !defined(erListe)')],
      },
      styles: TekstStyles,
    },
  ],
});

export default {
  title: 'Dokument',
  name: DokumentNavn.DOKUMENT,
  type: SanityTyper.DOCUMENT,
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
        Rule.required().max(Konstanter.API_NAME_MAX_LENGTH),
      ],
    },
    { type: SanityTyper.STRING, title: 'Tittel bokmål', name: DokumentNavn.TITTEL_BOKMAAL },
    { type: SanityTyper.STRING, title: 'Tittel nynorsk', name: DokumentNavn.TITTEL_NYNORSK },

    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
};
