import React from 'react';
import styles from '../../../styles/styles.module.css';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { Rule } from 'sanity';

export const AvansertDelmalFelter = (erGjentagende = false) => [
  {
    title: 'Avansert delmal',
    name: DokumentNavn.DELMAL_REFERANSE,
    type: SanityTyper.REFERENCE,
    to: { type: 'avansertDelmal' },
    validation: (rule: Rule) => [rule.required().error('Tom delmal')],
  },
  {
    title: 'Delmalen skal alltid med',
    name: DokumentNavn.SKAL_ALLTID_MED,
    type: SanityTyper.BOOLEAN,
    description: 'Dersom denne er på kan systemet kan validere at denne alltid er med ',
    validation: (rule: Rule) => [rule.required().error('Velg om delmalen alltid skal med.')],
  },
  ...(erGjentagende
    ? [
        {
          title: 'Er gjentagende',
          name: DokumentNavn.ER_GJENTAGENDE,
          type: SanityTyper.BOOLEAN,
          validation: (rule: Rule) => [
            rule.required().error('Må sette om delmalen er gjentagende'),
          ],
        },
      ]
    : []),
];

export default {
  name: DokumentNavn.DELMAL,
  type: SanityTyper.OBJECT,
  title: 'Delmal',
  blockEditor: {
    icon: () => <span className={styles.delmalIcon}>D</span>,
    render: (props: any) => <span className={styles.delmal}>{props.children}</span>,
  },
  fields: AvansertDelmalFelter(),
};
