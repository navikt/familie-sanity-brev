import {
  BegrunnelseDokumentNavn,
  DokumentNavn,
  KSBegrunnelseDokumentNavn,
  SanityTyper,
} from '../../../../util/typer';
import { VilkårRolle } from '../ba-sak/typer';
import { triggere } from './triggere';
import { eøsHjemler } from '../ba-sak/eøs/hjemler';
import { vilkårsvurderingTriggere } from './vilkårsvurderingerTriggere';
import { rolleSkalVises } from '../ba-sak/utils';
import { validerBegrunnelse } from '../ba-sak/validerBegrunnelse';
import {
  begrunnelseEØSFlettefelt,
  begrunnelseFlettefelt,
  begrunnelseValgfelt,
} from './begrunnelseFlettefelt';
import { resultat } from './resultat';
import { tema } from './tema';
import { type } from './type';
import { hjemler } from './hjemler';
import { apiNavnValideringerBegrunnelse } from './valideringer';
import { utdypendeVilkårsvurderinger } from './utdypendeVilkårsvurderinger';

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
  name: KSBegrunnelseDokumentNavn.KS_BEGRUNNELSE,
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
    resultat,
    tema,
    type,
    {
      title: 'Api-navn',
      type: SanityTyper.STRING,
      name: DokumentNavn.API_NAVN,
      description: 'Teknisk navn. Eksempel innvilgetInnhenteOpplysninger',
      validation: rule =>
        apiNavnValideringerBegrunnelse(rule, KSBegrunnelseDokumentNavn.KS_BEGRUNNELSE),
    },
    {
      title: 'Navn i ks-sak',
      type: SanityTyper.STRING,
      name: DokumentNavn.NAVN_I_SYSTEM,
      validation: rule => [rule.required().error('Dokumentet må ha et navn i ks-sak')],
    },
    hjemler,
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
    utdypendeVilkårsvurderinger,
    triggere,
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};

export default begrunnelse;
