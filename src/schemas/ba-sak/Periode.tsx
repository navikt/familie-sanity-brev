import styles from '../../../styles/myStyling.css';
import * as React from 'react';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { Konstanter } from '../../util/konstanter';
import TekstStyles from '../../util/TekstStyles';

const flettefelterPeriode = ['fom', 'tom', 'type', 'beløp', 'antallBarn', 'barnasFødselsdager'];
const blockflettefelterPeriode = ['begrunnelser'];

const perodeFlettefeltAnnotering = {
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
      name: DokumentNavn.FLETTEFELT,
      type: SanityTyper.STRING,
      options: {
        list: flettefelterPeriode,
      },
    },
  ],
};

const periodeFlettefeltBlock = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  fields: [
    {
      name: DokumentNavn.FLETTEFELT,
      type: SanityTyper.STRING,
      options: {
        list: blockflettefelterPeriode,
      },
    },
  ],
};

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    periodeFlettefeltBlock,
    {
      type: SanityTyper.BLOCK,
      marks: {
        annotations: [perodeFlettefeltAnnotering],
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
      validation: Rule => [
        Rule.required().error('Dokumentet må ha et apiNavn'),
        Rule.required()
          .max(Konstanter.API_NAME_MAX_LENGTH)
          .error(`Api-navnet kan være på maksimalt ${Konstanter.API_NAME_MAX_LENGTH} tegn.`),
      ],
    },
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};
