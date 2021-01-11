import styles from '../../styles/myStyling.css';
import React from 'react';
import NyttFelt from '../componenter/NyttFelt';

export const EnkelDelmalFeltFields = [
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
    to: [{ type: 'enkelDelmal' }],
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
