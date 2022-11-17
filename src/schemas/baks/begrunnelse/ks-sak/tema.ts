import { KSBegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';

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

export const tema = {
  title: 'Tema',
  type: SanityTyper.STRING,
  name: KSBegrunnelseDokumentNavn.TEMA,
  options: {
    list: Object.values(Tema).map(tema => temaValg[tema]),
  },
  validation: rule => rule.required().error('Tema ikke valgt'),
  initialValue: Tema.NASJONAL,
};
