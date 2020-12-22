import styles from '../../styles/myStyling.css';
import React from 'react';

export default {
  name: 'valgfelt',
  type: 'object',
  title: 'Valgfelt',
  blockEditor: {
    icon: () => <span className={styles.valgfeltIcon}>V</span>,
    render: props => <span className={styles.valgfelt}>{props.children}</span>,
  },
  fields: [
    {
      name: 'valgfelt',
      type: 'reference',
      to: [{ type: 'valgfelt' }],
      validation: Rule => [Rule.required().error('Tomt valgfelt')],
    },
  ],
};
