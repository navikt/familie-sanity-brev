import React from 'react';
import editor from './avansertMalEditor';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { apiNavnValideringer } from '../../util/valideringer';
import { Badge } from '@sanity/ui';

const TittelBadge = () => {
  return <Badge tone="primary">Brevmal</Badge>;
};

export default {
  title: 'Avansert dokument',
  name: DokumentNavn.DOKUMENTMAL,
  type: SanityTyper.DOCUMENT,
  preview: {
    select: {
      tittel: DokumentNavn.VISNINGSNAVN,
      publisert: DokumentNavn.PUBLISERT,
    },
    prepare(selection) {
      const { tittel, publisert } = selection;
      return {
        title: tittel,
        subtitle: publisert ? 'PUBLISERT' : '',
      };
    },
  },
  fields: [
    {
      name: 'badgeTittel',
      inputComponent: TittelBadge,
      type: 'string',
    },
    {
      title: 'Publisert',
      name: DokumentNavn.PUBLISERT,
      description: 'Sett denne til publisert når brevmalen skal vises i saksbehandlingsløsningen.',
      type: 'boolean',
    },
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: Rule => [Rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Api navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: rule => apiNavnValideringer(rule, DokumentNavn.DOKUMENTMAL),
    },
    { type: SanityTyper.STRING, title: 'Tittel bokmål', name: DokumentNavn.TITTEL_BOKMAAL },
    { type: SanityTyper.STRING, title: 'Tittel nynorsk', name: DokumentNavn.TITTEL_NYNORSK },

    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
  initialValue: {
    publisert: false,
  },
};
