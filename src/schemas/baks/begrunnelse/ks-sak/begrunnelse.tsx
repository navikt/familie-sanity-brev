import { BegrunnelseDokumentNavn, DokumentNavn, SanityTyper } from '../../../../util/typer';
import {
  Begrunnelsestype,
  begrunnelsestyperTilMenynavn,
  Behandlingstema,
  behandlingstemaValg,
  hjemler,
  hjemlerFolketrygdloven,
  VilkårRolle,
} from '../ba-sak/typer';
import { triggesAv } from './triggesAv';
import { eøsHjemler } from '../ba-sak/eøs/hjemler';
import { vilkårsvurderingTriggere } from './vilkårsvurderingerTriggere';
import { rolleSkalVises } from '../ba-sak/utils';
import { validerBegrunnelse } from '../ba-sak/validerBegrunnelse';
import { apiNavnValideringerBegrunnelse } from '../ba-sak/valideringer';
import {
  begrunnelseEØSFlettefelt,
  begrunnelseFlettefelt,
  begrunnelseValgfelt,
} from './begrunnelseFlettefelt';

const editor = (maalform, tittel) => ({
  name: maalform,
  title: tittel,
  type: SanityTyper.ARRAY,
  of: [
    {
      name: DokumentNavn.BLOCK,
      type: SanityTyper.BLOCK,
      of: [begrunnelseFlettefelt, begrunnelseEØSFlettefelt, begrunnelseValgfelt],
    },
  ],
});

const begrunnelse = {
  title: 'Begrunnelse',
  name: BegrunnelseDokumentNavn.KS_BEGRUNNELSE,
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
    vilkårsvurderingTriggere,
    ...triggesAv,
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};

export default begrunnelse;
