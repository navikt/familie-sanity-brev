import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';

export enum BegrunnelseTema {
  NASJONAL = 'NASJONAL',
  FELLES = 'FELLES',
  EØS = 'EØS',
}

export const begrunnelseTemaTilMenyValg = (
  begrunnelseTema: BegrunnelseTema,
): Menyvalg<BegrunnelseTema> => {
  const begrunnelseTemaTilMenynavn = (begrunnelseTema: BegrunnelseTema): string => {
    switch (begrunnelseTema) {
      case BegrunnelseTema.FELLES:
        return 'Felles';
      case BegrunnelseTema.NASJONAL:
        return 'Nasjonal';
      case BegrunnelseTema.EØS:
        return 'EØS';
    }
  };

  return { title: begrunnelseTemaTilMenynavn(begrunnelseTema), value: begrunnelseTema };
};

export const begrunnelseTema = {
  title: 'Tema',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.TEMA,
  options: {
    list: Object.values(BegrunnelseTema).map(begrunnelseTema =>
      begrunnelseTemaTilMenyValg(begrunnelseTema),
    ),
  },
  validation: rule => rule.required().error('Behandlingstema ikke valgt'),
  initialValue: BegrunnelseTema.NASJONAL,
};
