import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';

export enum BegrunnelseTema {
  NASJONAL = 'NASJONAL',
  FELLES = 'FELLES',
  PRIMÆRLAND = 'PRIMÆRLAND',
  SEKUNDÆRLAND = 'SEKUNDÆRLAND',
  INSTITUSJON = 'INSTITUSJON',
}

export const begrunnelseTemaTilMenynavn: Record<
  BegrunnelseTema,
  {
    title: string;
    value: BegrunnelseTema;
  }
> = {
  FELLES: { title: 'Felles', value: BegrunnelseTema.FELLES },
  INSTITUSJON: { title: 'Institusjon', value: BegrunnelseTema.INSTITUSJON },
  NASJONAL: { title: 'Nasjonal', value: BegrunnelseTema.NASJONAL },
  PRIMÆRLAND: { title: 'Primærland', value: BegrunnelseTema.PRIMÆRLAND },
  SEKUNDÆRLAND: { title: 'Sekundærland', value: BegrunnelseTema.SEKUNDÆRLAND },
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
