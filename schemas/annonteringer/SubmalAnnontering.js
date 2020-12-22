import styles from '../../styles/myStyling.css';
import React from 'react';

export default {
  name: 'submal',
  type: 'object',
  title: 'Delmal',
  blockEditor: {
    icon: () => <span className={styles.submalIcon}>D</span>,
    render: props => <span className={styles.submal}>{props.children}</span>,
  },
  fields: [
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
  ],
};
