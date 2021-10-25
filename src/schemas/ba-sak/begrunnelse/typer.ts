export enum Begrunnelsestype {
  INNVILGET = 'INNVILGET',
  REDUKSJON = 'REDUKSJON',
  AVSLAG = 'AVSLAG',
  OPPHØR = 'OPPHØR',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
  ENDRET_UTBETALINGSPERIODE = 'ENDRET_UTBETALINGSPERIODE',
  ETTER_ENDRET_UTBETALINGSPERIODE = 'ETTER_ENDRET_UTBETALINGSPERIODE',
}

export const begrunnelsestyper = [
  { title: 'Innvilget', value: Begrunnelsestype.INNVILGET },
  { title: 'Reduksjon', value: Begrunnelsestype.REDUKSJON },
  { title: 'Avslag', value: Begrunnelsestype.AVSLAG },
  { title: 'Opphør', value: Begrunnelsestype.OPPHØR },
  { title: 'Fortsatt innvilget', value: Begrunnelsestype.FORTSATT_INNVILGET },
  { title: 'Endret utbetalingsperiode', value: Begrunnelsestype.ENDRET_UTBETALINGSPERIODE },
];

export const hjemler = ['2', '4', '5', '9', '10', '11', '12', '14', '17', '18'];

export const hjemlerFolketrygdloven = ['2-5', '2-8'];

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

export enum Formuleringstype {
  FOR_BARN_FØDT = 'forBarnFødt',
  DU_OG_ELLER_BARNET_BARNA = 'duOgEllerBarnetBarna',
  BARNET_ELLER_BARNA = 'barnetEllerBarna',
}

export type Formuleringsvalg = { title: string; value: Formuleringstype };

export const formuleringer: Formuleringsvalg[] = [
  { title: 'For barn født', value: Formuleringstype.FOR_BARN_FØDT },
  { title: 'Du eller Du og barna', value: Formuleringstype.DU_OG_ELLER_BARNET_BARNA },
];

export const flettefelter = [
  { title: 'Måned og år for begrunnelse', value: 'maanedOgAarBegrunnelsenGjelderFor' },
  { title: 'Barns fødselsdato', value: 'barnasFodselsdatoer' },
];

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum VilkårTriggere {
  VURDERING_ANNET_GRUNNLAG = 'VURDERING_ANNET_GRUNNLAG',
  MEDLEMSKAP = 'MEDLEMSKAP',
  DELT_BOSTED = 'DELT_BOSTED',
  MANGLER_OPPLYSNINGER = 'MANGLER_OPPLYSNINGER',
  SATSENDRING = 'SATSENDRING',
  BARN_MED_6_ÅRS_DAG = 'BARN_MED_6_ÅRS_DAG',
  ALLTID_AUTOMATISK = 'ALLTID_AUTOMATISK',
}

export enum VilkårRolle {
  SOKER = 'SOKER',
  BARN = 'BARN',
}

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export const lovligOppholdTriggere = [VilkårTriggere.VURDERING_ANNET_GRUNNLAG];
export const bosattIRiketTriggere = [
  VilkårTriggere.VURDERING_ANNET_GRUNNLAG,
  VilkårTriggere.MEDLEMSKAP,
];
export const giftPartnerskapTriggere = [
  VilkårTriggere.VURDERING_ANNET_GRUNNLAG,
  VilkårTriggere.MEDLEMSKAP,
];
export const borMedSøkerTriggere = [
  VilkårTriggere.VURDERING_ANNET_GRUNNLAG,
  VilkårTriggere.DELT_BOSTED,
];
export const øvrigeTriggere = [
  VilkårTriggere.BARN_MED_6_ÅRS_DAG,
  VilkårTriggere.SATSENDRING,
  VilkårTriggere.MANGLER_OPPLYSNINGER,
  VilkårTriggere.ALLTID_AUTOMATISK,
];

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
    title: 'Delt bosted',
    value: VilkårTriggere.DELT_BOSTED,
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
};

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum Endringsårsak {
  DELT_BOSTED = 'DELT_BOSTED',
  EØS_SEKUNDÆRLAND = 'EØS_SEKUNDÆRLAND',
}

export const endringsårsaker = [
  { title: 'Delt bosted', value: Endringsårsak.DELT_BOSTED },
  { title: 'Eøs sekundærland', value: Endringsårsak.EØS_SEKUNDÆRLAND },
];

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum EndretUtbetalingsperioderTrigger {
  ETTER_ENDRET_UTBETALINGSPERIODE = 'ETTER_ENDRET_UTBETALINGSPERIODE',
}

export const endretUtbetalingsperioderTriggereValg = [
  {
    title: 'Begrunnelse kommer etter endret utbetalings',
    value: EndretUtbetalingsperioderTrigger.ETTER_ENDRET_UTBETALINGSPERIODE,
  },
];

//NB: Endrer du på disse bør du endre i ba-sak først (Før du tester lokalt også)
export enum EndretUtbetalingsperioderDeltBostedTrigger {
  SKAL_UTBETALES = 'SKAL_UTBETALES',
}

export const endretUtbetalingsperioderDeltBostedTriggereValg = [
  {
    title: 'Skal utbetales til søker',
    value: EndretUtbetalingsperioderDeltBostedTrigger.SKAL_UTBETALES,
  },
];
