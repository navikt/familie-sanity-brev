import { Konstanter } from './konstanter';

const førsteTegnErLitenBokstav = (tekst: string): true | string =>
  RegExp(/^[a-zæøå].*/).test(tekst)
    ? true
    : 'Første tegn i feltet kan ikke være tall eller stor bokstav.';

const kunBokstaverOgTallUtenÆØÅ = (tekst: string): true | string =>
  RegExp(/^[a-z0-9]+$/i).test(tekst)
    ? true
    : 'Feltet kan kun bestå av tall eller boksaver (ikke æ, ø, å).';

export const apiNavnValideringer = Rule => [
  Rule.required().error('Feltet må settes'),
  Rule.required().custom(kunBokstaverOgTallUtenÆØÅ),
  Rule.required().custom(førsteTegnErLitenBokstav),
  Rule.required()
    .max(Konstanter.API_NAME_MAX_LENGTH)
    .error(`Feltet kan være på maksimalt ${Konstanter.API_NAME_MAX_LENGTH} tegn.`),
];
