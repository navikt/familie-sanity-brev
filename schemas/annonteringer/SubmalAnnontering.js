import styles from '../../styles/myStyling.css';
import React from 'react';
import NyttFelt from '../componenter/NyttFelt';
import DelmalBlock from '../componenter/DelmalBlock';

export const DelmalFeltFields = [
  {
    name: 'lagNy',
    type: 'string',
    description: 'En knapp for å lage nye delmaler',
    inputComponent: props => NyttFelt(props, 'delmal'),
  },
  {
    title: 'Delmal',
    name: 'submal',
    type: 'reference',
    to: [{ type: 'delmal' }],
    validation: Rule => [Rule.required().error('Tom delmal')],
  },
  {
    title: 'Skal med dersom:',
    name: 'skalMedFelt',
    type: 'reference',
    description: 'Delmalen kommer alltid med dersom dette feltet er tomt',
    to: [{ type: 'skalMedDersomFelt' }],
  },
];

export default {
  name: 'submal',
  type: 'object',
  title: 'Delmal',
  blockEditor: {
    icon: () => <span className={styles.submalIcon}>D</span>,
    render: props => <span className={styles.submal}>{props.children}</span>,
  },
  fields: DelmalFeltFields,
};
