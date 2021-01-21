import styles from '../../styles/myStyling.css';
import React from 'react';
import NyttFelt from '../komponenter/NyttFelt';
import { DokumentNavn, SanityTyper } from '../typer';

export const ValgFelter = [
  {
    name: 'lagNy',
    type: SanityTyper.STRING,
    description: 'En knapp for å lage nye valgfelt',
    inputComponent: props => NyttFelt(props, 'valgfelt'),
  },
  {
    name: DokumentNavn.VALGFELT,
    type: SanityTyper.REFERENCE,
    to: [{ type: 'valgfelt' }],
    validation: Rule => [Rule.required().error('Tomt valgfelt')],
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
  fields: ValgFelter,
};
