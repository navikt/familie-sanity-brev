export const erCamelCase = (tekst: string): true | string => {
  const erAlphaNummerisk = RegExp(/^[a-z0-9æøå]+$/i).test(tekst);
  if (!erAlphaNummerisk) {
    return 'Dette feltet kan kun bestå av tall eller boksaver.';
  }

  const førsteTegnErLitenBokstav = RegExp(/^[a-zæøå].*/).test(tekst);
  if (!førsteTegnErLitenBokstav) {
    return 'Første tegn i dette feltet kan ikke være tall eller stor bokstav.';
  }

  return true;
};
