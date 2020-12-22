import styles from '../../styles/myStyling.css';
import React from 'react';

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
      name: 'felt',
      type: 'reference',
      to: [{ type: 'flettefelt' }],
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
    },
  ],
};
