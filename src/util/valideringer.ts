import { Konstanter } from './konstanter';

export const førsteTegnErLitenBokstav = (tekst: string): true | string =>
  RegExp(/^[a-zæøå].*/).test(tekst)
    ? true
    : 'Første tegn i Api-navn kan ikke være tall eller stor bokstav.';
export const kunBokstaverOgTall = (tekst: string): true | string =>
  RegExp(/^[a-z0-9æøå]+$/i).test(tekst) ? true : 'Api-navn kan kun bestå av tall eller boksaver.';

const kunBokstaverOgTallUtenÆØÅ = (tekst: string): true | string =>
  RegExp(/^[a-z0-9]+$/i).test(tekst) ? true : 'Api-navn kan kun bestå av tall eller boksaver A-Z.';

export const apiNavnValideringer = Rule => [
  Rule.required().error('Api-navn må settes'),
  Rule.required().custom(kunBokstaverOgTallUtenÆØÅ),
  Rule.required().custom(førsteTegnErLitenBokstav),
  Rule.required()
    .max(Konstanter.API_NAME_MAX_LENGTH)
    .error(`Api-navn kan være på maksimalt ${Konstanter.API_NAME_MAX_LENGTH} tegn.`),
];
