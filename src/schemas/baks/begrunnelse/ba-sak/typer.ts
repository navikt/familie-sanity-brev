import {
  BegrunnelseDokumentNavn,
  DokumentNavn,
  EØSBegrunnelseDokumentNavn,
} from '../../../../util/typer';
import { Valgbarhet } from './sanityMappeFelt/valgbarhet';
import { Regelverk } from './sanityMappeFelt/regelverk';

export const hjemler = ['2', '3', '4', '5', '9', '10', '11', '12', '14', '17', '18', '22'];

export const hjemlerFolketrygdloven = ['2-5', '2-8'];

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum NasjonaleVilkår {
  UNDER_18_ÅR = 'UNDER_18_ÅR',
  BOR_MED_SOKER = 'BOR_MED_SOKER',
  GIFT_PARTNERSKAP = 'GIFT_PARTNERSKAP',
  BOSATT_I_RIKET = 'BOSATT_I_RIKET',
  LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
  UTVIDET_BARNETRYGD = 'UTVIDET_BARNETRYGD',
}

export const vilkår = [
  { title: 'Under 18 år', value: NasjonaleVilkår.UNDER_18_ÅR },
  { title: 'Bor med søker', value: NasjonaleVilkår.BOR_MED_SOKER },
  { title: 'Gift partnerskap', value: NasjonaleVilkår.GIFT_PARTNERSKAP },
  { title: 'Bosatt i riket', value: NasjonaleVilkår.BOSATT_I_RIKET },
  { title: 'Lovlig opphold', value: NasjonaleVilkår.LOVLIG_OPPHOLD },
  { title: 'Utvidet barnetrygd', value: NasjonaleVilkår.UTVIDET_BARNETRYGD },
];

export const flettefelter = [
  { title: 'Måned og år for begrunnelse', value: 'maanedOgAarBegrunnelsenGjelderFor' },
  { title: 'Barns fødselsdato', value: 'barnasFodselsdatoer' },
  { title: 'Beløp', value: 'belop' },
  { title: 'Søknadstidspunkt', value: 'soknadstidspunkt' },
  { title: 'Avtaletidspunkt - delt bosted', value: 'avtaletidspunktDeltBosted' },
];

export const eøsFlettefelter = [
  { title: 'Annen forelders aktivitetsland', value: 'annenForeldersAktivitetsland' },
  { title: 'Barnets bostedsland', value: 'barnetsBostedsland' },
  { title: 'Barns fødselsdato', value: 'barnasFodselsdatoer' },
  { title: 'Søkers aktivitetsland', value: 'sokersAktivitetsland' },
];

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum VilkårTriggere {
  VURDERING_ANNET_GRUNNLAG = 'VURDERING_ANNET_GRUNNLAG',
  MEDLEMSKAP = 'MEDLEMSKAP',
  MANGLER_OPPLYSNINGER = 'MANGLER_OPPLYSNINGER',
  SATSENDRING = 'SATSENDRING',
  BARN_MED_6_ÅRS_DAG = 'BARN_MED_6_ÅRS_DAG',
  ALLTID_AUTOMATISK = 'ALLTID_AUTOMATISK',
  SMÅBARNSTILLEGG = 'SMÅBARNSTILLEGG',
  OPPHØR_FRA_FORRIGE_BEHANDLING = 'OPPHØR_FRA_FORRIGE_BEHANDLING',
  REDUKSJON_FRA_FORRIGE_BEHANDLING = 'REDUKSJON_FRA_FORRIGE_BEHANDLING',
  BARN_DØD = 'BARN_DØD',
  SKAL_VISES_SELV_OM_IKKE_ENDRING = 'SKAL_VISES_SELV_OM_IKKE_ENDRING',
}

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export const lovligOppholdTriggerTyper = [VilkårTriggere.VURDERING_ANNET_GRUNNLAG];
export const bosattIRiketTriggerTyper = [
  VilkårTriggere.VURDERING_ANNET_GRUNNLAG,
  VilkårTriggere.MEDLEMSKAP,
];
export const giftPartnerskapTriggerTyper = [
  VilkårTriggere.VURDERING_ANNET_GRUNNLAG,
  VilkårTriggere.MEDLEMSKAP,
];
export const øvrigeTriggertyper = [
  VilkårTriggere.BARN_MED_6_ÅRS_DAG,
  VilkårTriggere.SATSENDRING,
  VilkårTriggere.MANGLER_OPPLYSNINGER,
  VilkårTriggere.ALLTID_AUTOMATISK,
  VilkårTriggere.OPPHØR_FRA_FORRIGE_BEHANDLING,
  VilkårTriggere.REDUKSJON_FRA_FORRIGE_BEHANDLING,
  VilkårTriggere.BARN_DØD,
  VilkårTriggere.SKAL_VISES_SELV_OM_IKKE_ENDRING,
];
export const utvidetBarnetrygdTriggertyper = [VilkårTriggere.SMÅBARNSTILLEGG];

export const vilkårTriggerTilMenynavn: Record<VilkårTriggere, { title: string; value: string }> = {
  SKAL_VISES_SELV_OM_IKKE_ENDRING: {
    title: 'Skal vises selv om det ikke er endring',
    value: VilkårTriggere.SKAL_VISES_SELV_OM_IKKE_ENDRING,
  },
  VURDERING_ANNET_GRUNNLAG: {
    title: 'Vurdering annet grunnlag',
    value: VilkårTriggere.VURDERING_ANNET_GRUNNLAG,
  },
  MEDLEMSKAP: {
    title: 'Medlemskap',
    value: VilkårTriggere.MEDLEMSKAP,
  },
  BARN_MED_6_ÅRS_DAG: { title: 'Barn med 6 års dag', value: VilkårTriggere.BARN_MED_6_ÅRS_DAG },
  MANGLER_OPPLYSNINGER: {
    title: 'Mangler opplysninger',
    value: VilkårTriggere.MANGLER_OPPLYSNINGER,
  },
  SATSENDRING: { title: 'Satsendring', value: VilkårTriggere.SATSENDRING },
  ALLTID_AUTOMATISK: {
    title: 'Skal kun settes automatisk og ikke manuelt',
    value: VilkårTriggere.ALLTID_AUTOMATISK,
  },
  SMÅBARNSTILLEGG: {
    title: 'Småbarnstillegg',
    value: VilkårTriggere.SMÅBARNSTILLEGG,
  },
  OPPHØR_FRA_FORRIGE_BEHANDLING: {
    title: 'Opphør fra forrige behandling',
    value: VilkårTriggere.OPPHØR_FRA_FORRIGE_BEHANDLING,
  },
  REDUKSJON_FRA_FORRIGE_BEHANDLING: {
    title: 'Reduksjon fra forrige behandling',
    value: VilkårTriggere.REDUKSJON_FRA_FORRIGE_BEHANDLING,
  },
  BARN_DØD: {
    title: 'Barn død',
    value: VilkårTriggere.BARN_DØD,
  },
};

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum Endringsårsak {
  DELT_BOSTED = 'DELT_BOSTED',
  EØS_SEKUNDÆRLAND = 'EØS_SEKUNDÆRLAND',
  ENDRE_MOTTAKER = 'ENDRE_MOTTAKER',
  ALLEREDE_UTBETALT = 'ALLEREDE_UTBETALT',
  ETTERBETALING_3ÅR = 'ETTERBETALING_3ÅR',
  ETTERBETALING_3MND = 'ETTERBETALING_3MND',
}

export const endringsårsaker = [
  { title: 'Delt bosted', value: Endringsårsak.DELT_BOSTED },
  { title: 'Foreldrene bor sammen, endret mottaker', value: Endringsårsak.ENDRE_MOTTAKER },
  { title: 'Allerede utbetalt', value: Endringsårsak.ALLEREDE_UTBETALT },
  { title: 'Eøs sekundærland', value: Endringsårsak.EØS_SEKUNDÆRLAND },
  { title: 'Etterbetaling 3 år', value: Endringsårsak.ETTERBETALING_3ÅR },
  { title: 'Etterbetaling 3 måned', value: Endringsårsak.ETTERBETALING_3MND },
];

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum EndretUtbetalingsperioderTrigger {
  ETTER_ENDRET_UTBETALINGSPERIODE = 'ETTER_ENDRET_UTBETALINGSPERIODE',
}

export const endretUtbetalingsperioderTriggereValg = [
  {
    title: 'Begrunnelse kommer etter endret utbetalingsperiode',
    value: EndretUtbetalingsperioderTrigger.ETTER_ENDRET_UTBETALINGSPERIODE,
  },
];

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum EndretUtbetalingsperioderDeltBostedTrigger {
  SKAL_UTBETALES = 'SKAL_UTBETALES',
  SKAL_IKKE_UTBETALES = 'SKAL_IKKE_UTBETALES',
  UTBETALING_IKKE_RELEVANT = 'UTBETALING_IKKE_RELEVANT',
}

export const endretUtbetalingsperioderDeltBostedTriggereValgUtbetaling = [
  {
    title: 'Skal utbetales til søker',
    value: EndretUtbetalingsperioderDeltBostedTrigger.SKAL_UTBETALES,
  },
  {
    title: 'Skal ikke utbetales til søker',
    value: EndretUtbetalingsperioderDeltBostedTrigger.SKAL_IKKE_UTBETALES,
  },
  {
    title: 'Utbetaling ikke relevant for begrunnelse',
    value: EndretUtbetalingsperioderDeltBostedTrigger.UTBETALING_IKKE_RELEVANT,
  },
];

interface BegrunnelseBase {
  [DokumentNavn.VISNINGSNAVN]?: string;
  [BegrunnelseDokumentNavn.PERIODE_RESULTAT_FOR_PERSON]?: string;
  [BegrunnelseDokumentNavn.REGELVERK]?: Regelverk;
  [BegrunnelseDokumentNavn.VALGBARHET]?: Valgbarhet;
  [BegrunnelseDokumentNavn.BEGRUNNELSE_TYPE_FOR_PERSON]?: string;
  [DokumentNavn.API_NAVN]?: string;
  [DokumentNavn.MAPPE]?: string[];
  [DokumentNavn.NAVN_I_SYSTEM]?: string;
  [BegrunnelseDokumentNavn.HJEMLER]?: string[];
  [BegrunnelseDokumentNavn.HJEMLER_FOLKETRYGDLOVEN]?: string[];
  [DokumentNavn.BOKMAAL]?: any[];
  [DokumentNavn.NYNORSK]?: any[];
}

export interface NasjonalBegrunnelse extends BegrunnelseBase {
  [BegrunnelseDokumentNavn.VILKÅR]?: string[];
  [BegrunnelseDokumentNavn.ROLLE]?: string[];
  [BegrunnelseDokumentNavn.TRIGGES_AV_LOVLIG_OPPHOLD]?: string[];
  [BegrunnelseDokumentNavn.BOSATT_I_RIKET_TRIGGERE]?: string[];
  [BegrunnelseDokumentNavn.GIFT_PARTNERSKAP_TRIGGERE]?: string[];
  [BegrunnelseDokumentNavn.BOR_MED_SØKER_TRIGGERE]?: string[];
  [BegrunnelseDokumentNavn.UTVIDET_BARNETRYGD_TRIGGERE]?: string[];
  [BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE]?: string[];
  [BegrunnelseDokumentNavn.ENDRINGSAARSAKER]?: string[];
  [BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_TRIGGERE]?: string[];
  [BegrunnelseDokumentNavn.ENDRET_UTBETALINGSPERIODE_DELT_BOSTED_UTBETALING_TRIGGER]?: string;
}

export interface InstitusjonBegrunnelse extends BegrunnelseBase {
  [BegrunnelseDokumentNavn.VILKÅR]?: string[];
  [BegrunnelseDokumentNavn.TRIGGES_AV_LOVLIG_OPPHOLD]?: string[];
  [BegrunnelseDokumentNavn.BOSATT_I_RIKET_TRIGGERE]?: string[];
  [BegrunnelseDokumentNavn.GIFT_PARTNERSKAP_TRIGGERE]?: string[];
  [BegrunnelseDokumentNavn.BOR_MED_SØKER_TRIGGERE]?: string[];
  [BegrunnelseDokumentNavn.ØVRIGE_TRIGGERE]?: string[];
}

export interface EøsBegrunnelse extends BegrunnelseBase {
  [BegrunnelseDokumentNavn.ROLLE]?: string[];
  [BegrunnelseDokumentNavn.HJEMLER_EØS_FORORDNINGEN_833]?: string[];
  [BegrunnelseDokumentNavn.HJEMLER_EØS_FORORDNINGEN_987]?: string[];
  [BegrunnelseDokumentNavn.HJEMLER_SEPERASJONSAVTALEN_STORBRITANNINA]?: string[];
  [EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK]?: string[];
  [EØSBegrunnelseDokumentNavn.ANNEN_FORELDERS_AKTIVITET]?: string[];
  [EØSBegrunnelseDokumentNavn.BARNETS_BOSTEDSLAND]?: string[];
  [EØSBegrunnelseDokumentNavn.KOMPETANSE_RESULTAT]?: string[];
  [EØSBegrunnelseDokumentNavn.VILKÅR]?: string[];
  [EØSBegrunnelseDokumentNavn.UTDYPENDE_VILKÅRSVURDERINGER]?: string[];
}

export type Begrunnelse = NasjonalBegrunnelse | InstitusjonBegrunnelse | EøsBegrunnelse;
