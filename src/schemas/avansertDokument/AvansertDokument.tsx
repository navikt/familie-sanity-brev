import React from 'react';
import editor from './avansertMalEditor';
import { DokumentNavn, SanityTyper } from '../../util/typer';
import { apiNavnValideringer } from '../../util/valideringer';
import { Badge } from '@sanity/ui';
import { Rule } from 'sanity';

const TittelBadge = () => {
  return <Badge tone="primary">Brevmal</Badge>;
};

export default {
  title: 'Brevmaler',
  name: DokumentNavn.AVANSERT_DOKUMENT,
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
      components: { input: TittelBadge },
      type: 'string',
      title: 'Dokumenttype',
    },
    {
      title: 'Publisert',
      name: DokumentNavn.PUBLISERT,
      description: 'Sett denne til publisert når brevmalen skal vises i saksbehandlingsløsningen.',
      type: 'boolean',
    },
    {
      title: 'Overgangsstønad',
      name: DokumentNavn.FOR_OVERGANGSSTØNAD,
      description: 'Velg denne hvis relevant for overgangsstønad',
      type: SanityTyper.BOOLEAN,
    },
    {
      title: 'Barnetilsyn',
      name: DokumentNavn.FOR_BARNETILSYN,
      description: 'Velg denne hvis relevant for barnetilsyn',
      type: SanityTyper.BOOLEAN,
    },
    {
      title: 'Skolepenger',
      name: DokumentNavn.FOR_SKOLEPENGER,
      description: 'Velg denne hvis relevant for skolepenger',
      type: SanityTyper.BOOLEAN,
    },
    {
      title: 'Frittstående brev',
      name: DokumentNavn.FRITTSTÅENDE_BREV,
      type: SanityTyper.OBJECT,
      fields: [
        {
          title: 'Kan brukes frittstående',
          name: DokumentNavn.FOR_FRITTSTÅENDE_BREV,
          description:
            'Når denne avhukes vil malen vises for frittsående brev. En mal kan brukes både frittstående og i behandlinsgflyt',
          type: SanityTyper.BOOLEAN,
        },
        {
          title: 'Tittel Dokumentoversikt',
          name: DokumentNavn.TITTEL_DOKUMENTOVERSIKT,
          description:
            'Tittel på brev i dokumentoversikten. Er kun gjeldende for frittstående brev',
          type: SanityTyper.STRING,
          validation: (rule: Rule) =>
            rule.custom((tittel: string, context) => {
              if (
                context.document[DokumentNavn.FRITTSTÅENDE_BREV][
                  DokumentNavn.FOR_FRITTSTÅENDE_BREV
                ] &&
                (!tittel || tittel.length < 3)
              ) {
                return "Tittel i dokumentoversikt er påkrevd når 'Frittstående brev' er valgt";
              }
              return true;
            }),
        },
      ],
    },
    {
      title: 'prioriteringsnummer',
      type: SanityTyper.NUMBER,
      name: DokumentNavn.PRIORITERINGSNUMMER,
      description:
        'Et nummer som brukes for å sortere brevmaler stigende i saksbehandlingsløsningen. Eksempel 1 vil vises først',
      validation: (rule: Rule) =>
        rule.custom((value: number) => {
          if (value < 1) {
            return 'Tallet må være større enn eller lik 1';
          }
          return true;
        }),
    },
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: (rule: Rule) => [rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Api navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: (rule: Rule) => apiNavnValideringer(rule, DokumentNavn.AVANSERT_DOKUMENT),
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
