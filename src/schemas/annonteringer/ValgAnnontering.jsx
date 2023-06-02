import styles from '../../../styles/myStyling.css?inline';
import React from 'react';
import NyttFelt from '../../komponenter/NyttFelt';
import { DokumentNavn, SanityTyper } from '../../util/typer';

export const ValgFelter = (erGjentagende = false) => [
  {
    name: DokumentNavn.VALG_REFERANSE,
    type: SanityTyper.REFERENCE,
    to: [{ type: 'valgfelt' }],
    validation: Rule => [Rule.required().error('Tomt valgfelt')],
  },
  {
    title: 'Valgfeltet skal alltid med',
    name: DokumentNavn.SKAL_ALLTID_MED,
    type: SanityTyper.BOOLEAN,
    description: 'Dersom denne er på kan systemet kan validere at denne alltid er med ',
    validation: Rule => [Rule.required().error('Velg om Valgfeltet alltid skal med.')],
  },
  ...(erGjentagende
    ? [
        {
          title: 'Er gjentagende',
          name: DokumentNavn.ER_GJENTAGENDE,
          type: SanityTyper.BOOLEAN,
          validation: Rule => [Rule.required().error('Må sette om valgfeltet er gjentagende')],
        },
      ]
    : []),
  {
    name: 'lagNy',
    type: SanityTyper.STRING,
    description: 'En knapp for å lage nye valgfelt',
    inputComponent: props => NyttFelt(props, 'valgfelt'),
  },
];

export default {
  name: DokumentNavn.VALGFELT,
  type: SanityTyper.OBJECT,
  title: 'Valgfelt',
  blockEditor: {
    icon: () => <span className={styles.valgfeltIcon}>V</span>,
    render: props => <span className={styles.valgfelt}>{props.children}</span>,
  },
  fields: ValgFelter(false),
};
