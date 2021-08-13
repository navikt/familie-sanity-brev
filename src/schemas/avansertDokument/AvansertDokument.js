import React from 'react';
import editor from './avansertMalEditor';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { apiNavnValideringer } from '../../util/valideringer';
import { Badge } from '@sanity/ui';

const TittelBadge = () => {
  return <Badge tone="primary">Avansert dokument</Badge>;
};

export default {
  title: 'Avansert dokument',
  name: DokumentNavn.DOKUMENTMAL,
  type: SanityTyper.DOCUMENT,
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
  fields: [
    {
      name: 'badgeTittel',
      inputComponent: TittelBadge,
      type: 'string',
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
      validation: apiNavnValideringer,
    },
    { type: SanityTyper.STRING, title: 'Tittel bokmål', name: DokumentNavn.TITTEL_BOKMAAL },
    { type: SanityTyper.STRING, title: 'Tittel nynorsk', name: DokumentNavn.TITTEL_NYNORSK },

    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};
