import React from 'react';
import styles from '../../styles/styles.module.css';
import { MdLink } from 'react-icons/md';
import { BsFilterRight } from 'react-icons/bs';

export default [
  { title: 'Fet', value: 'strong' },
  { title: 'Kursiv', value: 'em' },
  {
    title: 'Høyrestill',
    value: 'hoyrestill',
    icon: BsFilterRight,
    component: props => <span className={styles.høyrestill}>{props.children}</span>,
  },
  {
    title: 'Lenke',
    value: 'lenke',
    icon: () => <MdLink />,
    component: props => (
      <span contentEditable={true} className={styles.lenke}>
        {props.children}
      </span>
    ),
  },
];
