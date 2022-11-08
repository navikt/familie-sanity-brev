import * as React from 'react';

import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../util/typer';
import { eøsFlettefelter, flettefelter } from './ks-sak/begrunnelse/typer';
import { validerFlettefeltErGyldigForBehandlingstema } from './ba-sak/begrunnelse/utils';
import styled from 'styled-components';

export const begrunnelseFlettefelt = {
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
        rule.custom(validerFlettefeltErGyldigForBehandlingstema),
      ],
    },
  ],
  preview: {
    select: {
      flettefelt: DokumentNavn.FLETTEFELT,
    },
    prepare: selection => selection,
    component: props => {
      const flettefelt = flettefelter.find(
        flettefelt => flettefelt.value === props.value.flettefelt,
      );
      return <Flettefelt>{flettefelt?.title ?? 'Tomt flettefelt'}</Flettefelt>;
    },
  },
};

export const begrunnelseEØSFlettefelt = {
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
        rule.custom(validerFlettefeltErGyldigForBehandlingstema),
      ],
    },
  ],
  preview: {
    select: {
      flettefelt: DokumentNavn.FLETTEFELT,
    },
    prepare: selection => selection,
    component: props => {
      const flettefelt = eøsFlettefelter.find(
        flettefelt => flettefelt.value === props.value.flettefelt,
      );
      return <Flettefelt>{flettefelt?.title ?? 'Tomt flettefelt'}</Flettefelt>;
    },
  },
};

export const begrunnelseValgfelt = {
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
    prepare: selection => selection,
    component: props => (
      <Flettefelt>
        {props.value?.valgVisningsnavn ? props.value.valgVisningsnavn : 'Tomt valgfelt'}
      </Flettefelt>
    ),
  },
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
