import * as React from 'react';
import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../../../util/typer';
import styled from 'styled-components';
import { eøsFlettefelter, flettefelter, hjemler, hjemlerFolketrygdloven, vilkår } from './typer';
import { triggesAv } from './triggesAv';
import { apiNavnValideringerBegrunnelse } from './valideringer';
import { validerBegrunnelse } from './validerBegrunnelse';
import {
  erNasjonalEllerInstitusjonsBegrunnelse,
  lagVilkårManglerForNasjonalEllerInstitusjonBegrunnelse,
  validerFlettefeltErGyldigForRegelverk,
} from './utils';
import { Mappe, mapperTilMenynavn } from './mapper';
import { eøsHjemler } from './eøs/hjemler';
import { lagInvaliderUtvidetForInstitusjonRegel } from './institusjon/utils';
import { valgbarhet } from './sanityMappeFelt/valgbarhet';
import { fagsakType } from './sanityMappeFelt/fagsakType';
import { rolle } from './sanityMappeFelt/rolle';
import { begunnelseTypeForPerson } from './sanityMappeFelt/begrunnelsetypeForPerson';
import { brevPeriodeType } from './sanityMappeFelt/brevPeriodetype';
import { periodeResultatForPerson } from './sanityMappeFelt/perioderesultatForPerson';
import { regelverk } from './sanityMappeFelt/regelverk';

const begrunnelseFlettefelt = {
  name: DokumentNavn.FLETTEFELT,
  type: SanityTyper.OBJECT,
  fields: [
    {
      name: DokumentNavn.FLETTEFELT,
      type: SanityTyper.STRING,
      options: {
        list: [...flettefelter],
      },
      validation: rule => [
        rule.required().error('Tomt flettefelt'),
        rule.custom(validerFlettefeltErGyldigForRegelverk),
      ],
    },
  ],
  preview: {
    select: {
      flettefelt: DokumentNavn.FLETTEFELT,
    },
  },
  components: {
    preview: (props: any) => {
      const flettefelt = flettefelter.find(flettefelt => flettefelt.value === props.flettefelt);
      return <Flettefelt>{flettefelt?.title ?? 'Tomt flettefelt'}</Flettefelt>;
    },
  },
};

const begrunnelseEØSFlettefelt = {
  title: 'EØS-flettefelt',
  name: DokumentNavn.EØS_FLETTEFELT,
  type: SanityTyper.OBJECT,
  fields: [
    {
      name: DokumentNavn.FLETTEFELT,
      type: SanityTyper.STRING,
      options: {
        list: [...eøsFlettefelter],
      },
      validation: rule => [
        rule.required().error('Tomt flettefelt'),
        rule.custom(validerFlettefeltErGyldigForRegelverk),
      ],
    },
  ],
  preview: {
    select: {
      flettefelt: DokumentNavn.FLETTEFELT,
    },
  },
  components: {
    preview: (props: any) => {
      const flettefelt = eøsFlettefelter.find(flettefelt => flettefelt.value === props.flettefelt);
      return <Flettefelt>{flettefelt?.title ?? 'Tomt flettefelt'}</Flettefelt>;
    },
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
      validation: rule => [rule.required().error('Tomt valgfelt')],
    },
    {
      name: BegrunnelseDokumentNavn.SKAL_HA_STOR_FORBOSKTAV,
      type: SanityTyper.BOOLEAN,
      validation: rule => [rule.required().error('Du må velge om det skal være stor bokstav')],
    },
  ],
  initialValue: {
    [BegrunnelseDokumentNavn.SKAL_HA_STOR_FORBOSKTAV]: false,
  },
  preview: {
    select: {
      valgVisningsnavn: `${DokumentNavn.VALG_REFERANSE}.${DokumentNavn.VISNINGSNAVN}`,
    },
  },
  components: {
    preview: (props: any) => (
      <Flettefelt>{props?.valgVisningsnavn ? props.valgVisningsnavn : 'Tomt valgfelt'}</Flettefelt>
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
    brevPeriodeType,
    periodeResultatForPerson,
    regelverk,
    valgbarhet,
    fagsakType,
    begunnelseTypeForPerson,
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
    {
      title: 'Ikke i bruk',
      type: SanityTyper.BOOLEAN,
      name: BegrunnelseDokumentNavn.IKKE_I_BRUK,
      description: 'Huk av dersom begrunnelsen ikke lenger skal være tilgjengelig',
    },
    ...eøsHjemler,
    {
      title: 'Støtter fritekst',
      type: SanityTyper.BOOLEAN,
      name: BegrunnelseDokumentNavn.STØTTER_FRITEKST,
      description:
        'Huk av dersom det skal dukke opp mulighet til å skrive inn fritekst når begrunnelsen er valgt i BA-SAK',
    },
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
        lagVilkårManglerForNasjonalEllerInstitusjonBegrunnelse(rule).warning(),
        lagInvaliderUtvidetForInstitusjonRegel(rule),
      ],
      hidden: context => !erNasjonalEllerInstitusjonsBegrunnelse(context.document),
    },

    rolle,
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
