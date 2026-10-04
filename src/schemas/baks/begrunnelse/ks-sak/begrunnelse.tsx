import { Rule } from 'sanity';
import { BegrunnelseDokumentNavn, DokumentNavn, KSBegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { rolle } from '../ba-sak/sanityMappeFelt/rolle';
import { validerBegrunnelse } from '../ba-sak/validerBegrunnelse';
import { begrunnelseEØSFlettefelt, begrunnelseFlettefelt, begrunnelseValgfelt } from './begrunnelseFlettefelt';
import { annenForeldersAktivitetTrigger } from './eøs/eøsTriggere/annenForeldersAktivitetTrigger';
import { barnetsBostedslandTrigger } from './eøs/eøsTriggere/barnetsBostedslandTriggere';
import { hvilkeTriggereSkalBrukes } from './eøs/eøsTriggere/hvilkeTriggereSkalBrukes';
import { kompetentLandTrigger } from './eøs/eøsTriggere/kompetentLandTrigger';
import { eøsVilkårsvurderingTriggere } from './eøs/eøsTriggere/vilkårsvurderingerTriggere';
import { eøsHjemler } from './eøs/hjemler';
import { hjemler } from './hjemler';
import { endretUtbetalingsperiodeTriggere } from './nasjonal/nasjonaleTriggere/endretUtbetalingPeriodeTriggere';
import { endringsårsakTriggere } from './nasjonal/nasjonaleTriggere/endringsårsakTriggere';
import { utdypendeVilkårsvurderinger } from './nasjonal/nasjonaleTriggere/utdypendeVilkårsvurderinger';
import { vilkårsvurderingTriggere } from './nasjonal/nasjonaleTriggere/vilkårsvurderingerTriggere';
import { resultat } from './resultat';
import { tema } from './tema';
import { triggere } from './triggere';
import { type } from './type';
import { apiNavnValideringerBegrunnelse } from './valideringer';

const editor = (maalform: DokumentNavn, tittel: string) => ({
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
            validation: (rule: Rule) => [rule.required().error('Dokumentet må ha et navn')],
        },
        resultat,
        tema,
        type,
        {
            title: 'Api-navn',
            type: SanityTyper.STRING,
            name: DokumentNavn.API_NAVN,
            description: 'Teknisk navn. Eksempel innvilgetInnhenteOpplysninger',
            validation: (rule: Rule) => apiNavnValideringerBegrunnelse(rule, KSBegrunnelseDokumentNavn.KS_BEGRUNNELSE),
        },
        {
            title: 'Navn i ks-sak',
            type: SanityTyper.STRING,
            name: DokumentNavn.NAVN_I_SYSTEM,
            validation: (rule: Rule) => [rule.required().error('Dokumentet må ha et navn i ks-sak')],
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
