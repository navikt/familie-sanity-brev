export const hjemler = ['2', '3', '6', '7', '8', '9', '10', '12', '13', '14', '16'];

export enum Tema {
  NASJONAL = 'NASJONAL',
  FELLES = 'FELLES',
  EØS_PRIMÆRLAND = 'EØS_PRIMÆRLAND',
  EØS_SEKUNDÆRLAND = 'EØS_SEKUNDÆRLAND',
}

export const temaValg: Record<Tema, { title: string; value: Tema }> = {
  NASJONAL: { title: 'Nasjonal', value: Tema.NASJONAL },
  FELLES: {
    title: 'Felles',
    value: Tema.FELLES,
  },
  EØS_PRIMÆRLAND: { title: 'EØS - Primærland', value: Tema.EØS_PRIMÆRLAND },
  EØS_SEKUNDÆRLAND: { title: 'EØS - Sekundærland', value: Tema.EØS_SEKUNDÆRLAND },
};

export enum Type {
  STANDARD = 'STANDARD',
  TILLEGGSTEKST = 'TILLEGGSTEKST',
  ENDRINGSPERIODE = 'ENDRINGSPERIODE',
}

export const typeValg: Record<Type, { title: string; value: Type }> = {
  STANDARD: { title: 'Standard', value: Type.STANDARD },
  TILLEGGSTEKST: {
    title: 'Tilleggstekst',
    value: Type.TILLEGGSTEKST,
  },
  ENDRINGSPERIODE: { title: 'Endringsperiode', value: Type.ENDRINGSPERIODE },
};

export enum Resultat {
  INNVILGET = 'INNVILGET',
  REDUKSJON = 'REDUKSJON',
  AVSLAG = 'AVSLAG',
  OPPHØR = 'OPPHØR',
  FORTSATT_INNVILGET = 'FORTSATT_INNVILGET',
}

export const resultatValg: Record<Resultat, { title: string; value: Resultat }> = {
  INNVILGET: { title: 'Innvilget', value: Resultat.INNVILGET },
  REDUKSJON: {
    title: 'Reduksjon',
    value: Resultat.REDUKSJON,
  },
  AVSLAG: { title: 'Avslag', value: Resultat.AVSLAG },
  OPPHØR: { title: 'Opphør', value: Resultat.OPPHØR },
  FORTSATT_INNVILGET: { title: 'Fortsatt innvilget', value: Resultat.FORTSATT_INNVILGET },
};
