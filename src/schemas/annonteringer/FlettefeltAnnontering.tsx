import React from 'react';
import styles from '../../../styles/styles.module.css';
import NyttFelt from '../../komponenter/NyttFelt';
import { DokumentNavn, SanityTyper } from '../../util/typer';

const FlettefeltIcon = () => <span className={styles.flettefeltIcon}>F</span>;

export default (filter?: string) => ({
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  title: 'Flettefelt',
  icon: FlettefeltIcon,
  fields: [
    {
      name: 'flettefeltReferanse',
      type: SanityTyper.REFERENCE,
      to: [{ type: DokumentNavn.FLETTEFELT }],
      validation: (rule: any) => [rule.required().error('Tomt flettefelt')],
      options: { filter: filter },
    },
    {
      name: 'lagNy',
      type: 'string',
      description: 'En knapp for å lage nye flettefelt',
      components: { input: (props: any) => NyttFelt(props, 'flettefelt') },
    },
  ],
});
