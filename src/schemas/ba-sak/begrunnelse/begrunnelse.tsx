import * as React from 'react';
import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../../util/typer';
import styled from 'styled-components';
import { apiNavnValideringer } from '../../../util/valideringer';
import {
  begrunnelsestyper,
  flettefelter,
  hjemler,
  hjemlerFolketrygdloven,
  Vilkår,
  vilkår,
  VilkårRolle,
} from './typer';
import { triggesAv } from './triggesAv';
import { endringsårsakTrigger, erEndretUtbetaling } from './triggere/endringsårsakTrigger';
import { endretUtbetalingsperiodeTriggere } from './triggere/endretUtbetalingPeriodeTrigger';
import { endretUtbetalingsperiodeDeltBostedTriggere } from './triggere/endretUtbetalingPeriodeDeltBostedTrigger';

const begrunnelseFlettefelt = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  fields: [
    {
      name: DokumentNavn.FLETTEFELT,
      type: SanityTyper.STRING,
      options: {
        list: flettefelter,
      },
      validation: Rule => [Rule.required().error('Tomt flettefelt')],
    },
  ],
  preview: {
    select: {
      flettefelt: DokumentNavn.FLETTEFELT,
    },
    prepare: selection => selection,
    component: props => (
      <Flettefelt>{props.value.flettefelt ? props.value.flettefelt : 'Tomt flettefelt'}</Flettefelt>
    ),
  },
};

const begrunnelseValgfelt = {
  name: BegrunnelseDokumentNavn.VALGFELT_V2,
  type: SanityTyper.OBJECT,
  title: 'Referanse til valgfelt',
  fields: [
    {
      type: SanityTyper.REFERENCE,
      to: [{ type: DokumentNavn.VALGFELT }],
      name: DokumentNavn.VALG_REFERANSE,
      validation: Rule => [Rule.required().error('Tomt valgfelt')],
    },
    {
      name: BegrunnelseDokumentNavn.SKAL_HA_STOR_FORBOSKTAV,
      type: SanityTyper.BOOLEAN,
      validation: Rule => [Rule.required().error('Du må velge om det skal være stor bokstav')],
    },
  ],
  initialValue: {
    [BegrunnelseDokumentNavn.SKAL_HA_STOR_FORBOSKTAV]: false,
  },
  preview: {
    select: {
      valgVisningsnavn: `${DokumentNavn.VALG_REFERANSE}.${DokumentNavn.VISNINGSNAVN}`,
    },
    prepare: selection => selection,
    component: props => {
      return (
        <Flettefelt>
          {props.value?.valgVisningsnavn ? props.value.valgVisningsnavn : 'Tomt valgfelt'}
        </Flettefelt>
      );
    },
  },
};

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
        begrunnelseValgfelt,
        {
          /*
           * Gammel versjon av formuleringsfelt.
           * Beholdes for å ikke miste det som er lagt inn i sanity.
           * begrunnelseFormuleringsfelt skal brukes.
           * Vises ikke i sanity.
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
  name: BegrunnelseDokumentNavn.BEGRUNNELSE,
  type: SanityTyper.DOCUMENT,
  preview: {
    select: {
      title: DokumentNavn.VISNINGSNAVN,
    },
  },
  fields: [
    {
      title: 'Visningsnavn',
      type: SanityTyper.STRING,
      name: DokumentNavn.VISNINGSNAVN,
      validation: Rule => [Rule.required().error('Dokumentet må ha et navn')],
    },
    {
      title: 'Api-navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innhenteOpplysninger',
      validation: rule => apiNavnValideringer(rule, BegrunnelseDokumentNavn.BEGRUNNELSE),
    },
    {
      title: 'Mappe',
      name: DokumentNavn.MAPPE,
      type: SanityTyper.ARRAY,
      of: [
        {
          type: 'string',
          options: {
            list: begrunnelsestyper,
          },
        },
      ],
    },
    {
      title: 'Navn i ba-sak',
      type: SanityTyper.STRING,
      name: DokumentNavn.NAVN_I_SYSTEM,
      validation: Rule => [Rule.required().error('Dokumentet må ha et navn i ba-sak')],
    },
    {
      title: 'Begrunnelsetype',
      type: SanityTyper.STRING,
      name: BegrunnelseDokumentNavn.BEGRUNNELSE_TYPE,
      options: {
        list: begrunnelsestyper,
      },
      validation: Rule => Rule.required().error('Begrunnelsestype ikke valgt'),
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
    {
      title: 'Vilkår',
      type: SanityTyper.ARRAY,
      name: BegrunnelseDokumentNavn.VILKÅR,
      of: [{ type: SanityTyper.STRING }],
      options: {
        list: vilkår,
      },
      validation: Rule => Rule.required().warning('Vilkår ikke valgt'),
      hidden: ({ document }) => !erEndretUtbetaling(document),
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
      hidden: ({ document }) =>
        !(
          document.vilkaar &&
          (document.vilkaar.includes(Vilkår.BOSATT_I_RIKET) ||
            document.vilkaar.includes(Vilkår.LOVLIG_OPPHOLD))
        ),
    },
    ...triggesAv,
    endringsårsakTrigger,
    endretUtbetalingsperiodeTriggere,
    endretUtbetalingsperiodeDeltBostedTriggere,
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};

const Flettefelt = styled.span`
  background-color: rgba(30, 133, 209, 0.2);
`;

export default begrunnelse;
