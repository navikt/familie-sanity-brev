import { Konstanter } from './konstanter';
import groq from 'groq';
import { client } from './sanity';

const førsteTegnErLitenBokstav = (tekst: string): true | string =>
  RegExp(/^[a-zæøå].*/).test(tekst)
    ? true
    : 'Første tegn i feltet kan ikke være tall eller stor bokstav.';

const kunBokstaverOgTallUtenÆØÅ = (tekst: string): true | string =>
  RegExp(/^[a-z0-9]+$/i).test(tekst)
    ? true
    : 'Feltet kan kun bestå av tall eller boksaver (ikke æ, ø, å).';

export const maskinnavnValideringer = Rule => [
  Rule.required().error('Feltet må settes'),
  Rule.required().custom(kunBokstaverOgTallUtenÆØÅ),
  Rule.required().custom(førsteTegnErLitenBokstav),
  Rule.required()
    .max(Konstanter.API_NAME_MAX_LENGTH)
    .error(`Feltet kan være på maksimalt ${Konstanter.API_NAME_MAX_LENGTH} tegn.`),
];

export const apiNavnValideringer = (Rule, type) => [
  ...maskinnavnValideringer(Rule),
  Rule.custom(async (value, context) => {
    const erUnik = await erUniktApiNavn(type, value, context);
    if (!erUnik) return 'Apinavnet er ikke unikt.';
    return true;
  }),
];

const erUniktApiNavn = (type, apiNavn, context) => {
  const { document } = context;

  const id = document._id.replace(/^drafts\./, '');

  const params = {
    draft: `drafts.${id}`,
    published: id,
    type,
    apiNavn,
  };

  /* groq */
  const query = groq`!defined(*[
    _type == $type &&
    !(_id in [$draft, $published]) &&
    apiNavn == $apiNavn
  ][0]._id)`;

  const datasett = window.location.pathname.split('/')[1];

  return client(datasett, true).fetch(query, params);
};
