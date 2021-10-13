export const begrunnelsestyper = [
  { title: 'Innvilgelse', value: 'INNVILGELSE' },
  { title: 'Reduksjon', value: 'REDUKSJON' },
  { title: 'Avslag', value: 'AVSLAG' },
  { title: 'Opphør', value: 'OPPHØR' },
  { title: 'Fortsatt innvilget', value: 'FORTSATT_INNVILGET' },
];

export const hjemler = ['2', '4', '5', '9', '10', '11', '12', '14', '17', '18'];

export const hjemlerFolketrygdloven = ['2-5', '2-8'];

//NB: Endrer du på disse bør du endre i ba-sak først
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

//NB: Endrer du på disse bør du endre i ba-sak først
export enum VilkårTriggere {
  VURDERING_ANNET_GRUNNLAG = 'VURDERING_ANNET_GRUNNLAG',
  MEDLEMSKAP = 'MEDLEMSKAP',
  DELT_BOSTED = 'DELT_BOSTED',
  MANGLER_OPPLYSNINGER = 'MANGLER_OPPLYSNINGER',
  SATSENDRING = 'SATSENDRING',
  BARN_MED_6_ÅRS_DAG = 'BARN_MED_6_ÅRS_DAG',
  ALLTID_AUTOMATISK = 'ALLTID_AUTOMATISK',
  ENDRET_UTBETALING = 'ENDRET_UTBETALING',
  ETTER_ENDRET_UTBETALING = 'ETTER_ENDRET_UTBETALING',
}

export enum VilkårRolle {
  SOKER = 'SOKER',
  BARN = 'BARN',
}

//NB: Endrer du på disse bør du endre i ba-sak først
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
  VilkårTriggere.ENDRET_UTBETALING,
  VilkårTriggere.ETTER_ENDRET_UTBETALING,
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
  ENDRET_UTBETALING: {
    title: 'Endret utbetaling',
    value: VilkårTriggere.ENDRET_UTBETALING,
  },
  ETTER_ENDRET_UTBETALING: {
    title: 'Etter endret utbetaling',
    value: VilkårTriggere.ETTER_ENDRET_UTBETALING,
  },
};

//NB: Endrer du på disse bør du endre i ba-sak først
export enum Endringstype {
  DELT_BOSTED = 'DELT_BOSTED',
}

export const endringstyper = [{ title: 'Delt bosted', value: Endringstype.DELT_BOSTED }];
