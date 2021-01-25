export const erCamelCase = (tekst: string): true | string => {
  const erAlphaNummerisk = tekst.match(/^[a-zA-Z0-9]+$/i);
  if (!erAlphaNummerisk) {
    return 'Dette feltet kan kun bestå av tall eller boksaver.';
  }

  const førsteTegnErLitenBokstav = tekst.length > 0 && tekst[0].match(/^[0-9A-Z]+$/i);
  if (førsteTegnErLitenBokstav) {
    return 'Første tegn i dette feltet kan ikke være tall eller stor bokstav.';
  }

  return true;
};
