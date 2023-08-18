// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from '../../styles/myStyling.css?inline';
import * as React from 'react';
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
    icon: () => <MdLink className={styles.lenkeIcon} />,
    component: props => (
      <span contentEditable={true} className={styles.lenke}>
        {props.children}
      </span>
    ),
  },
];
