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
        {
          type: SanityTyper.REFERENCE,
          to: [{ type: DokumentNavn.VALGFELT }],
          name: DokumentNavn.VALG_REFERANSE,
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
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};

const Flettefelt = styled.span`
  background-color: rgba(30, 133, 209, 0.2);
`;

export default begrunnelse;
