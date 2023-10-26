import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';

export enum Regelverk {
  NASJONAL = 'NASJONAL',
  FELLES = 'FELLES',
  EØS = 'EØS',
}

export const regelverkTilMenyValg = (regelverk: Regelverk): Menyvalg<Regelverk> => {
  const regelverkTilMenynavn = (regelverk: Regelverk): string => {
    switch (regelverk) {
      case Regelverk.FELLES:
        return 'Felles';
      case Regelverk.NASJONAL:
        return 'Nasjonal';
      case Regelverk.EØS:
        return 'EØS';
    }
  };

  return { title: regelverkTilMenynavn(regelverk), value: regelverk };
};

export const regelverk = {
  title: 'Regelverk',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.REGELVERK,
  options: {
    list: Object.values(Regelverk).map(begrunnelseTema => regelverkTilMenyValg(begrunnelseTema)),
  },
  validation: rule => rule.required().error('Behandlingstema ikke valgt'),
  initialValue: Regelverk.NASJONAL,
};
