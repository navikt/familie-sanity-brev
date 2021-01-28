import styles from '../../styles/myStyling.css';
import * as React from 'react';
import { MdLink } from 'react-icons/md';

export default [
  { title: 'Fet', value: 'strong' },
  { title: 'Kursiv', value: 'em' },
  {
    title: 'Lenke',
    value: 'lenke',
    blockEditor: {
      icon: MdLink,
      render: props => (
        <span contentEditable={true} className={styles.lenke}>
          {props.children}
        </span>
      ),
    },
  },
];
