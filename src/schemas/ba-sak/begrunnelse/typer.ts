export enum Begrunnelsestype {
  INNVILGET = 'INNVILGET',
  REDUKSJON = 'REDUKSJON',
  AVSLAG = 'AVSLAG',
  OPPHØR = 'OPPHØR',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
  ENDRET_UTBETALINGSPERIODE = 'ENDRET_UTBETALINGSPERIODE',
  ETTER_ENDRET_UTBETALINGSPERIODE = 'ETTER_ENDRET_UTBETALINGSPERIODE',
}

export const begrunnelsestyperTilMenynavn: Record<
  Begrunnelsestype,
  { title: string; value: Begrunnelsestype }
> = {
  INNVILGET: { title: 'Innvilget', value: Begrunnelsestype.INNVILGET },
  REDUKSJON: { title: 'Reduksjon', value: Begrunnelsestype.REDUKSJON },
  AVSLAG: { title: 'Avslag', value: Begrunnelsestype.AVSLAG },
  OPPHØR: { title: 'Opphør', value: Begrunnelsestype.OPPHØR },
  FORTSATT_INNVILGET: { title: 'Fortsatt innvilget', value: Begrunnelsestype.FORTSATT_INNVILGET },
  ENDRET_UTBETALINGSPERIODE: {
    title: 'Endret utbetaling',
    value: Begrunnelsestype.ENDRET_UTBETALINGSPERIODE,
  },
  ETTER_ENDRET_UTBETALINGSPERIODE: {
    title: 'Etter endret utbetaling',
    value: Begrunnelsestype.ETTER_ENDRET_UTBETALINGSPERIODE,
  },
};

export const hjemler = ['2', '4', '5', '9', '10', '11', '12', '14', '17', '18'];

export const hjemlerFolketrygdloven = ['2-5', '2-8'];

export const eøshjemler = [];

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum Vilkår {
  UNDER_18_ÅR = 'UNDER_18_ÅR',
  BOR_MED_SOKER = 'BOR_MED_SOKER',
  GIFT_PARTNERSKAP = 'GIFT_PARTNERSKAP',
  BOSATT_I_RIKET = 'BOSATT_I_RIKET',
  LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
  UTVIDET_BARNETRYGD = 'UTVIDET_BARNETRYGD',
}

export const vilkår = [
  { title: 'Under 18 år', value: Vilkår.UNDER_18_ÅR },
  { title: 'Bor med søker', value: Vilkår.BOR_MED_SOKER },
  { title: 'Gift partnerskap', value: Vilkår.GIFT_PARTNERSKAP },
  { title: 'Bosatt i riket', value: Vilkår.BOSATT_I_RIKET },
  { title: 'Lovlig opphold', value: Vilkår.LOVLIG_OPPHOLD },
  { title: 'Utvidet barnetrygd', value: Vilkår.UTVIDET_BARNETRYGD },
];

export const flettefelter = [
  { title: 'Måned og år for begrunnelse', value: 'maanedOgAarBegrunnelsenGjelderFor' },
  { title: 'Barns fødselsdato', value: 'barnasFodselsdatoer' },
  { title: 'Beløp', value: 'belop' },
  { title: 'Søknadstidspunkt', value: 'soknadstidspunkt' },
  { title: 'Avtaletidspunkt - delt bosted', value: 'avtaletidspunktDeltBosted' },
];

export const eøsFlettefelter = [
  { title: 'Annen forelders aktivitet', value: 'annenForeldersAktivitet' },
  { title: 'Annen forelders aktivitetsland', value: 'annenForeldersAktivitetsland' },
  { title: 'Barnets bostedsland', value: 'barnetsBostedsland' },
];

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum VilkårTriggere {
  VURDERING_ANNET_GRUNNLAG = 'VURDERING_ANNET_GRUNNLAG',
  MEDLEMSKAP = 'MEDLEMSKAP',
  DELT_BOSTED = 'DELT_BOSTED',
  DELT_BOSTED_SKAL_IKKE_DELES = 'DELT_BOSTED_SKAL_IKKE_DELES',
  MANGLER_OPPLYSNINGER = 'MANGLER_OPPLYSNINGER',
  SATSENDRING = 'SATSENDRING',
  BARN_MED_6_ÅRS_DAG = 'BARN_MED_6_ÅRS_DAG',
  ALLTID_AUTOMATISK = 'ALLTID_AUTOMATISK',
  SMÅBARNSTILLEGG = 'SMÅBARNSTILLEGG',
  GJELDER_FØRSTE_PERIODE = 'GJELDER_FØRSTE_PERIODE',
  GJELDER_FRA_INNVILGELSESTIDSPUNKT = 'GJELDER_FRA_INNVILGELSESTIDSPUNKT',
}

export enum VilkårRolle {
  SOKER = 'SOKER',
  BARN = 'BARN',
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
export const borMedSøkerTriggerTyper = [
  VilkårTriggere.VURDERING_ANNET_GRUNNLAG,
  VilkårTriggere.DELT_BOSTED,
  VilkårTriggere.DELT_BOSTED_SKAL_IKKE_DELES,
];
export const øvrigeTriggertyper = [
  VilkårTriggere.BARN_MED_6_ÅRS_DAG,
  VilkårTriggere.SATSENDRING,
  VilkårTriggere.MANGLER_OPPLYSNINGER,
  VilkårTriggere.ALLTID_AUTOMATISK,
  VilkårTriggere.GJELDER_FØRSTE_PERIODE,
  VilkårTriggere.GJELDER_FRA_INNVILGELSESTIDSPUNKT,
];
export const utvidetBarnetrygdTriggertyper = [VilkårTriggere.SMÅBARNSTILLEGG];

export const vilkårTriggerTilMenynavn: Record<VilkårTriggere, { title: string; value: string }> = {
  VURDERING_ANNET_GRUNNLAG: {
    title: 'Vurdering annet grunnlag',
    value: VilkårTriggere.VURDERING_ANNET_GRUNNLAG,
  },
  MEDLEMSKAP: {
    title: 'Medlemskap',
    value: VilkårTriggere.MEDLEMSKAP,
  },
  DELT_BOSTED: {
    title: 'Delt bosted: skal deles',
    value: VilkårTriggere.DELT_BOSTED,
  },
  DELT_BOSTED_SKAL_IKKE_DELES: {
    title: 'Delt bosted: skal ikke deles',
    value: VilkårTriggere.DELT_BOSTED_SKAL_IKKE_DELES,
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
  GJELDER_FØRSTE_PERIODE: {
    title: 'Gjelder første periode',
    value: VilkårTriggere.GJELDER_FØRSTE_PERIODE,
  },
  GJELDER_FRA_INNVILGELSESTIDSPUNKT: {
    title: 'Gjelder fra invilgelsestidspunkt',
    value: VilkårTriggere.GJELDER_FRA_INNVILGELSESTIDSPUNKT,
  },
};

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum Endringsårsak {
  DELT_BOSTED = 'DELT_BOSTED',
  EØS_SEKUNDÆRLAND = 'EØS_SEKUNDÆRLAND',
  ENDRE_MOTTAKER = 'ENDRE_MOTTAKER',
  ALLEREDE_UTBETALT = 'ALLEREDE_UTBETALT',
  ETTERBETALING_3ÅR = 'ETTERBETALING_3ÅR',
}

export const endringsårsaker = [
  { title: 'Delt bosted', value: Endringsårsak.DELT_BOSTED },
  { title: 'Foreldrene bor sammen, endret mottaker', value: Endringsårsak.ENDRE_MOTTAKER },
  { title: 'Allerede utbetalt', value: Endringsårsak.ALLEREDE_UTBETALT },
  { title: 'Eøs sekundærland', value: Endringsårsak.EØS_SEKUNDÆRLAND },
  { title: 'Etterbetaling 3 år', value: Endringsårsak.ETTERBETALING_3ÅR },
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

export enum Behandlingstema {
  EØS = 'EØS',
  NASJONAL = 'NASJONAL',
}

export const behandlingstemaValg: Record<
  Behandlingstema,
  { title: string; value: Behandlingstema }
> = {
  EØS: { title: 'EØS', value: Behandlingstema.EØS },
  NASJONAL: { title: 'Nasjonal', value: Behandlingstema.NASJONAL },
};
