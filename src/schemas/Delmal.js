import HvorErDenIBruk from '../komponenter/HvorErDenIBruk';
import FlettefeltAnnontering from './annonteringer/FlettefeltAnnontering';
import { DokumentNavn, SanityTyper } from '../util/typer';
import { Konstanter } from '../util/konstanter';
import TekstStyles from '../util/TekstStyles';
import { flettefeltAvsnitt } from './avsnitt/flettefeltAvsnitt';
import decorators from '../util/decorators';
import React from 'react';

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    flettefeltAvsnitt,
    {
      type: SanityTyper.BLOCK,
      marks: {
        annotations: [FlettefeltAnnontering('erListe == false || !defined(erListe)')],
        decorators,
      },
      styles: TekstStyles,
    },
  ],
});

export default {
  title: 'Delmal',
  name: DokumentNavn.DELMAL,
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
      validation: Rule => [
        Rule.required().error('Dokumentet må ha et apiNavn'),
        Rule.required()
          .max(Konstanter.API_NAME_MAX_LENGTH)
          .error(`Api-navnet kan være på maksimalt ${Konstanter.API_NAME_MAX_LENGTH} tegn.`),
      ],
    },
    {
      name: 'hvorDenBrukes',
      type: SanityTyper.STRING,
      description:
        'Dette er et dummyfelt for å få vist komponenten som viser hvor den delte teksten er i bruk.',
      inputComponent: HvorErDenIBruk,
    },
    {
      title: 'Mappe',
      name: DokumentNavn.MAPPE,
      type: SanityTyper.ARRAY,
      of: [{ type: 'string' }],
    },
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};
