import * as React from 'react';
import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../../../util/typer';
import styled from 'styled-components';
import {
  Begrunnelsestype,
  begrunnelsestyperTilMenynavn,
  Behandlingstema,
  behandlingstemaValg,
  eøsFlettefelter,
  flettefelter,
  hjemler,
  hjemlerFolketrygdloven,
  vilkår,
  VilkårRolle,
} from './typer';
import { triggesAv } from './triggesAv';
import { apiNavnValideringerBegrunnelse } from './valideringer';
import { validerBegrunnelse } from './validerBegrunnelse';
import {
  rolleSkalVises,
  validerFlettefeltErGyldigForBehandlingstema,
  erNasjonalEllerInstitusjonsBegrunnelse,
} from './utils';
import { Mappe, mapperTilMenynavn } from './mapper';
import { eøsHjemler } from './eøs/hjemler';
import { lagInvaliderUtvidetForInstitusjonRegel } from './institusjon/utils';
import {
  begrunnelseEØSFlettefelt,
  begrunnelseFlettefelt,
  begrunnelseValgfelt,
} from '../../begrunnelseFlettefelt';

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    {
      name: DokumentNavn.BLOCK,
      type: SanityTyper.BLOCK,
      of: [
        begrunnelseFlettefelt,
        begrunnelseEØSFlettefelt,
        begrunnelseValgfelt,
        {
          /*
           * Gammel versjon av begrunnelseValgfelt.
           * Beholdes for å ikke miste det som er lagt inn i sanity.
           * begrunnelseValgfelt skal brukes.
           * Vises ikke i sanity.
           * begrunnelseValgfelt tillater at vi kobler mer data til valgfeltet (for eksempel stor forbokstav).
           */
          type: SanityTyper.REFERENCE,
          to: [{ type: DokumentNavn.VALGFELT }],
          name: DokumentNavn.VALG_REFERANSE,
          hidden: true,
        },
      ],
    },
  ],
});

const begrunnelse = {
  title: 'Begrunnelse',
  name: BegrunnelseDokumentNavn.BA_BEGRUNNELSE,
  type: SanityTyper.DOCUMENT,
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
  validation: validerBegrunnelse(),
  fields: [
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: rule => [rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Behandlingstema',
      type: SanityTyper.STRING,
      name: BegrunnelseDokumentNavn.BEHANDLINGSTEMA,
      options: {
        list: Object.values(Behandlingstema).map(
          behandlingstema => behandlingstemaValg[behandlingstema],
        ),
      },
      validation: rule => rule.required().error('Behandlingstema ikke valgt'),
      initialValue: Behandlingstema.NASJONAL,
    },
    {
      title: 'Begrunnelsetype',
      type: SanityTyper.STRING,
      name: BegrunnelseDokumentNavn.BEGRUNNELSE_TYPE,
      options: {
        list: Object.values(Begrunnelsestype).map(
          begrunnelsestype => begrunnelsestyperTilMenynavn[begrunnelsestype],
        ),
      },
      validation: rule => rule.required().error('Begrunnelsestype ikke valgt'),
    },
    {
      title: 'Api-navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innvilgetInnhenteOpplysninger',
      validation: rule =>
        apiNavnValideringerBegrunnelse(rule, BegrunnelseDokumentNavn.BA_BEGRUNNELSE),
    },
    {
      title: 'Mappe',
      name: DokumentNavn.MAPPE,
      type: SanityTyper.ARRAY,
      of: [
        {
          type: 'string',
          options: {
            list: Object.values(Mappe).map(mappe => mapperTilMenynavn[mappe]),
          },
        },
      ],
    },
    {
      title: 'Navn i ba-sak',
      type: SanityTyper.STRING,
      name: DokumentNavn.NAVN_I_SYSTEM,
      validation: rule => [rule.required().error('Dokumentet må ha et navn i ba-sak')],
    },
    {
      title: 'Hjemler',
      type: SanityTyper.ARRAY,
      name: BegrunnelseDokumentNavn.HJEMLER,
      of: [{ type: SanityTyper.STRING }],
      options: {
        layout: 'grid',
        list: hjemler.map(hjemmel => ({ value: hjemmel, title: `§${hjemmel}` })),
      },
    },
    {
      title: 'Hjemler fra folketrygdloven',
      type: SanityTyper.ARRAY,
      name: BegrunnelseDokumentNavn.HJEMLER_FOLKETRYGDLOVEN,
      of: [{ type: SanityTyper.STRING }],
      options: {
        layout: 'radio',
        list: hjemlerFolketrygdloven.map(hjemmel => ({ value: hjemmel, title: `§${hjemmel}` })),
      },
    },
    ...eøsHjemler,
    {
      title: 'Vilkår',
      description:
        'Hvilke vilkår som må være utgjørende for at begrunnelsen skal vises. ' +
        'Dersom flere er valgt må kun én være utgjørende for at begrunnelsen skal vises.',
      type: SanityTyper.ARRAY,
      name: BegrunnelseDokumentNavn.VILKÅR,
      of: [{ type: SanityTyper.STRING }],
      options: {
        list: vilkår,
      },
      validation: rule => [
        rule.required().warning('Vilkår ikke valgt'),
        lagInvaliderUtvidetForInstitusjonRegel(rule),
      ],
      hidden: context => !erNasjonalEllerInstitusjonsBegrunnelse(context.document),
    },

    {
      title: 'Rolle',
      type: SanityTyper.ARRAY,
      name: BegrunnelseDokumentNavn.ROLLE,
      of: [{ type: SanityTyper.STRING }],
      options: {
        list: [
          {
            title: 'Søker',
            value: VilkårRolle.SOKER,
          },
          {
            title: 'Barn',
            value: VilkårRolle.BARN,
          },
        ],
      },
      hidden: context => !rolleSkalVises(context.document),
      validation: rule =>
        rule.custom((rolleListe, context) => {
          if (rolleSkalVises(context.document)) {
            return !rolleListe || rolleListe.length === 0 ? 'Må velge minst en rolle' : true;
          }
          return true;
        }),
    },
    ...triggesAv,
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};

const Flettefelt = styled.span`
  background-color: rgba(30, 133, 209, 0.2);
  text-overflow: ellipsis;
  line-height: normal;
  white-space: nowrap;
  max-inline-size: 160px;
  overflow: hidden;
  display: inline-block;
`;

export default begrunnelse;
