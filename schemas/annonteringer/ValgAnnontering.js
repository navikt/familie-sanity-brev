import styles from '../../styles/myStyling.css';
import React from 'react';
import NyttFelt from '../komponenter/NyttFelt';

export const ValgFelter = [
  {
    name: 'lagNy',
    type: 'string',
    description: 'En knapp for å lage nye valgfelt',
    inputComponent: props => NyttFelt(props, 'valgfelt'),
  },
  {
    name: 'valgfelt',
    type: 'reference',
    to: [{ type: 'valgfelt' }],
    validation: Rule => [Rule.required().error('Tomt valgfelt')],
  },
];

export default {
  name: 'valgfelt',
  type: 'object',
  title: 'Valgfelt',
  blockEditor: {
    icon: () => <span className={styles.valgfeltIcon}>V</span>,
    render: props => <span className={styles.valgfelt}>{props.children}</span>,
  },
  fields: ValgFelter,
};
