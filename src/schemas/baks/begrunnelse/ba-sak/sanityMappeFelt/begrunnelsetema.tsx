import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';

export enum BegrunnelseTema {
  NASJONAL = 'NASJONAL',
  FELLES = 'FELLES',
  EØS = 'EØS',
}

export const begrunnelseTemaTilMenynavn: Record<
  BegrunnelseTema,
  {
    title: string;
    value: BegrunnelseTema;
  }
> = {
  FELLES: { title: 'Felles', value: BegrunnelseTema.FELLES },
  NASJONAL: { title: 'Nasjonal', value: BegrunnelseTema.NASJONAL },
  EØS: { title: 'EØS', value: BegrunnelseTema.EØS },
};

export const begrunnelseTema = {
  title: 'Tema',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.TEMA,
  options: {
    list: Object.values(BegrunnelseTema).map(
      begrunnelseTema => begrunnelseTemaTilMenynavn[begrunnelseTema],
    ),
  },
  validation: rule => rule.required().error('Behandlingstema ikke valgt'),
  initialValue: BegrunnelseTema.NASJONAL,
};
