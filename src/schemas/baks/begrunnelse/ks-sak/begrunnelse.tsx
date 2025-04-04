import {
  BegrunnelseDokumentNavn,
  DokumentNavn,
  KSBegrunnelseDokumentNavn,
  SanityTyper,
} from '../../../../util/typer';
import { triggere } from './triggere';
import { vilkårsvurderingTriggere } from './nasjonal/nasjonaleTriggere/vilkårsvurderingerTriggere';
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
import { utdypendeVilkårsvurderinger } from './nasjonal/nasjonaleTriggere/utdypendeVilkårsvurderinger';
import { endringsårsakTriggere } from './nasjonal/nasjonaleTriggere/endringsårsakTriggere';
import { endretUtbetalingsperiodeTriggere } from './nasjonal/nasjonaleTriggere/endretUtbetalingPeriodeTriggere';
import { rolle } from '../ba-sak/sanityMappeFelt/rolle';
import { hvilkeTriggereSkalBrukes } from './eøs/eøsTriggere/hvilkeTriggereSkalBrukes';
import { eøsHjemler } from './eøs/hjemler';
import { annenForeldersAktivitetTrigger } from './eøs/eøsTriggere/annenForeldersAktivitetTrigger';
import { barnetsBostedslandTrigger } from './eøs/eøsTriggere/barnetsBostedslandTriggere';
import { kompetentLandTrigger } from './eøs/eøsTriggere/kompetentLandTrigger';
import { eøsVilkårsvurderingTriggere } from './eøs/eøsTriggere/vilkårsvurderingerTriggere';

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
    rolle,
    {
      title: 'Støtter fritekst',
      type: SanityTyper.BOOLEAN,
      name: BegrunnelseDokumentNavn.STØTTER_FRITEKST,
      description:
        'Huk av dersom det skal dukke opp mulighet til å skrive inn fritekst når begrunnelsen er valgt i KS-SAK',
    },
    {
      title: 'Skal alltid vises',
      type: SanityTyper.BOOLEAN,
      name: KSBegrunnelseDokumentNavn.SKAL_ALLTID_VISES,
      description: 'Huk av dersom begrunnelsen alltid skal dukke opp som et valg',
    },
    {
      title: 'Ikke i bruk',
      type: SanityTyper.BOOLEAN,
      name: BegrunnelseDokumentNavn.IKKE_I_BRUK,
      description: 'Huk av dersom begrunnelsen ikke lenger skal være tilgjengelig',
    },
    vilkårsvurderingTriggere,
    triggere,
    endringsårsakTriggere,
    endretUtbetalingsperiodeTriggere,
    hvilkeTriggereSkalBrukes,
    annenForeldersAktivitetTrigger,
    barnetsBostedslandTrigger,
    kompetentLandTrigger,
    eøsVilkårsvurderingTriggere,
    utdypendeVilkårsvurderinger,
    editor(DokumentNavn.BOKMAAL, 'Bokmål'),
    editor(DokumentNavn.NYNORSK, 'Nynorsk'),
  ],
};

export default begrunnelse;
