import React from 'react';
import editor from './avansertMalEditor';
import HvorErDelmalenIBruk from '../../komponenter/HvorErDenIBruk/HvorErDelmalenIBruk';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { apiNavnValideringer } from '../../util/valideringer';
import { Badge } from '@sanity/ui';

const TittelBadge = () => {
  return <Badge tone="primary">Avansert delmal</Badge>;
};

export default {
  title: 'Innhold',
  name: DokumentNavn.AVANSERT_DELMAL,
  type: SanityTyper.DOCUMENT,
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
  fields: [
    {
      name: 'badgeTittel',
      components: { input: TittelBadge },
      type: 'string',
    },
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: Rule => [Rule.required().error('Dokumentet må ha et visningsnavn')],
    },
    {
      title: 'Api navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: rule => apiNavnValideringer(rule, DokumentNavn.AVANSERT_DELMAL),
    },
    {
      name: 'hvorDenBrukes',
      type: SanityTyper.STRING,
      description:
        'Dette er et dummyfelt for å få vist komponenten som viser hvor den delte teksten er i bruk',
      components: { input: HvorErDelmalenIBruk },
    },
    {
      title: 'Mappe',
      name: DokumentNavn.MAPPE,
      type: SanityTyper.ARRAY,
      of: [{ type: 'string' }],
    },
    {
      title: 'Mappe i saksbehandlingsløsning',
      description: 'Hvilket visningsnavn denne delmalen skal grupperes under i brevmenyen.',
      name: DokumentNavn.GRUPPE_VISNINGSNAVN,
      type: SanityTyper.STRING,
    },
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};
