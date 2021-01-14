import styles from '../../styles/myStyling.css';
import React from 'react';
import NyttFelt from '../komponenter/NyttFelt';

export default {
  name: 'flettefelt',
  type: 'object',
  title: 'Flettefelt',
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
      name: 'lagNy',
      type: 'string',
      description: 'En knapp for å lage nye flettefelt',
      inputComponent: props => NyttFelt(props, 'flettefelt'),
    },
    {
      name: 'felt',
      type: 'reference',
      to: [{ type: 'flettefelt' }],
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
    },
  ],
};
