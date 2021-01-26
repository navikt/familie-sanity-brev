import styles from '../../../styles/myStyling.css';
import React from 'react';
import NyttFelt from '../../komponenter/NyttFelt';
import { DokumentNavn, SanityTyper } from '../../util/typer';

export default (filter = undefined) => ({
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
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
      name: 'flettefeltReferanse',
      type: SanityTyper.REFERENCE,
      to: [{ type: DokumentNavn.FLETTEFELT }],
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
      options: { filter: filter },
    },
    {
      name: 'lagNy',
      type: 'string',
      description: 'En knapp for å lage nye flettefelt',
      inputComponent: props => NyttFelt(props, 'flettefelt'),
    },
  ],
});
