import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';

export enum PerioderesultatForPerson {
  INNVILGET_ELLER_ØKNING = 'INNVILGET_ELLER_ØKNING',
  REDUKSJON = 'REDUKSJON',
  IKKE_INNVILGET = 'IKKE_INNVILGET',
  INGEN_ENDRING = 'INGEN_ENDRING',
  IKKE_RELEVANT = 'IKKE_RELEVANT',
}

export const periodeResultatForPersonTilMenyValg = (
  periodeResultatForPerson: PerioderesultatForPerson,
): Menyvalg<PerioderesultatForPerson> => {
  const periodeResultatForPersonTilMenynavn = (
    periodeResultatForPerson: PerioderesultatForPerson,
  ): string => {
    switch (periodeResultatForPerson) {
      case PerioderesultatForPerson.INNVILGET_ELLER_ØKNING:
        return 'Innvilget eller økning';
      case PerioderesultatForPerson.REDUKSJON:
        return 'Reduksjon';
      case PerioderesultatForPerson.INGEN_ENDRING:
        return 'Ingen endring';
      case PerioderesultatForPerson.IKKE_INNVILGET:
        return 'Ikke innvilget';
      case PerioderesultatForPerson.IKKE_RELEVANT:
        return 'Ikke relevant';
    }
  };

  return {
    title: periodeResultatForPersonTilMenynavn(periodeResultatForPerson),
    value: periodeResultatForPerson,
  };
};

export const periodeResultatForPerson = {
  title: 'PeriodeResultatForPerson',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.PERIODE_RESULTAT_FOR_PERSON,
  options: {
    list: Object.values(PerioderesultatForPerson).map(vedtakResultat =>
      periodeResultatForPersonTilMenyValg(vedtakResultat),
    ),
  },
  validation: rule => rule.required().error('Resultat i perioden ikke valgt'),
};
