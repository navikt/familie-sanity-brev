import { KSBegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';

export enum Tema {
  NASJONAL = 'NASJONAL',
  FELLES = 'FELLES',
  EØS = 'EØS',
}

export const temaValg: Record<Tema, { title: string; value: Tema }> = {
  NASJONAL: { title: 'Nasjonal', value: Tema.NASJONAL },
  FELLES: {
    title: 'Felles',
    value: Tema.FELLES,
  },
  EØS: { title: 'EØS', value: Tema.EØS },
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
