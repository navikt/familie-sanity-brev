import styles from '../../../styles/myStyling.css';
import * as React from 'react';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import TekstStyles from '../../util/TekstStyles';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { apiNavnValideringer } from '../../util/valideringer';

const flettefelterPeriode = ['fom', 'tom', 'type', 'beløp', 'antallBarn', 'barnasFødselsdager'];
const avsnittflettefelterPeriode = ['begrunnelser'];

const periodeFlettefeltAnnotering = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  blockEditor: {
    icon: () => <span className={styles.flettefeltIcon}>F</span>,
    render: props => (
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
        list: flettefelterPeriode,
      },
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
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
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
    },
  ],
  preview: {
    select: {
      title: DokumentNavn.FELT,
    },
    prepare: selection => ({
      title: selection.title,
      media: AiOutlineUnorderedList,
    }),
  },
};

const editor = (maalform, tittel) => ({
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
      validation: Rule => [Rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Api-navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: apiNavnValideringer,
    },
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};
