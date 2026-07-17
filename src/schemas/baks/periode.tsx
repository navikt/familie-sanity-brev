import React from 'react';
import styles from '../../../styles/styles.module.css';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import TekstStyles from '../../util/TekstStyles';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { apiNavnValideringer } from '../../util/valideringer';
import { Rule } from 'sanity';

const flettefelterForPeriode = [
  { title: 'Fom', value: 'fom' },
  { title: 'Tom', value: 'tom' },
  { title: 'Beløp', value: 'belop' },
  { title: 'Antall barn', value: 'antallBarn' },
  { title: 'Barnas fødselsdager', value: 'barnasFodselsdager' },
  { title: 'Type Barnetrygd', value: 'typeBarnetrygd' },
  { title: 'Du eller Institusjonen', value: 'duEllerInstitusjonen' },
];

const avsnittflettefelterPeriode = ['begrunnelser'];

const periodeFlettefeltAnnotering = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  blockEditor: {
    icon: () => <span className={styles.flettefeltIcon}>F</span>,
    render: (props: { children: React.ReactNode }) => (
      <span contentEditable={true} className={styles.flettefelt}>
        {props.children}
      </span>
    ),
  },
  fields: [
    {
      name: DokumentNavn.FELT,
      type: SanityTyper.STRING,
      options: {
        list: flettefelterForPeriode,
      },
      validation: (rule: Rule) => [rule.required().error('Tomt flettefelt')],
    },
  ],
};

const periodeFlettefeltAvsnitt = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  fields: [
    {
      name: DokumentNavn.FELT,
      type: SanityTyper.STRING,
      options: {
        list: avsnittflettefelterPeriode,
      },
      validation: (rule: Rule) => [rule.required().error('Tomt flettefelt')],
    },
  ],
  preview: {
    select: {
      title: DokumentNavn.FELT,
    },
    prepare: (selection: { title?: string }) => ({
      title: selection.title,
      media: AiOutlineUnorderedList,
    }),
  },
};

const editor = (maalform: DokumentNavn, tittel: string) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    periodeFlettefeltAvsnitt,
    {
      type: SanityTyper.BLOCK,
      marks: {
        annotations: [periodeFlettefeltAnnotering],
      },
      styles: TekstStyles,
    },
  ],
});

export default {
  title: 'Periode',
  name: DokumentNavn.PERIODE,
  type: SanityTyper.DOCUMENT,
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
  fields: [
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: (rule: Rule) => [rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Api-navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: (rule: Rule) => apiNavnValideringer(rule, DokumentNavn.PERIODE),
    },
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};
