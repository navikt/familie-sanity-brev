import styles from '../../styles/myStyling.css';
import React from 'react';
import NyttFelt from '../komponenter/NyttFelt';
import { DokumentNavn, SanityTyper } from '../typer';

export const DelmalFelter = (kanVæreGjentagende = false) => [
  {
    title: 'Delmal',
    name: DokumentNavn.DELMAL_REFERANSE,
    type: SanityTyper.REFERENCE,
    to: [{ type: 'avansertDelmal' }, { type: 'delmal' }],
    validation: Rule => [Rule.required().error('Tom delmal')],
  },
  {
    title: 'Delmalen skal alltid med',
    name: DokumentNavn.SKAL_ALLTID_MED,
    type: SanityTyper.BOOLEAN,
    description: 'Dersom denne er på kan systemet kan validere at denne alltid er med ',
    validation: Rule => [Rule.required().error('Velg om delmalen alltid skal med.')],
  },
  ...(kanVæreGjentagende
    ? [
        {
          title: 'Er gjentagende',
          name: DokumentNavn.ER_GJENTAGENDE,
          type: SanityTyper.BOOLEAN,
          validation: Rule => [Rule.required().error('Må sette om delmalen er gjentagende')],
        },
      ]
    : []),
  {
    name: 'lagNy',
    type: 'string',
    description: 'En knapp for å lage ny delmal',
    inputComponent: props => NyttFelt(props, DokumentNavn.DELMAL),
  },
];

export default {
  name: DokumentNavn.DELMAL,
  type: SanityTyper.OBJECT,
  title: 'Delmal',
  blockEditor: {
    icon: () => <span className={styles.delmalIcon}>D</span>,
    render: props => <span className={styles.delmal}>{props.children}</span>,
  },
  fields: DelmalFelter(),
};
