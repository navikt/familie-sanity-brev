import { apiNavnValideringer } from '../../../../util/valideringer';
import { Resultat } from './resultat';

const apiNavnPrefiksMap: Record<Resultat, string> = {
  AVSLAG: 'avslag',
  FORTSATT_INNVILGET: 'fortsattInnvilget',
  INNVILGET: 'innvilget',
  OPPHØR: 'opphor',
  REDUKSJON: 'reduksjon',
};

export const apiNavnValideringerBegrunnelse = (rule, type) => {
  return [
    ...apiNavnValideringer(rule, type),
    rule.custom((verdi: string, kontekst): true | string => {
      const resultat = kontekst.document.resultat;

      if (!Object.values(Resultat).includes(resultat)) {
        return (
          'Begrunnelsesresultat er ikke satt og valideringen for Apinavnet avhenger av resultatet. ' +
          'Sett begrunnelsesresultat før du setter apiNavn.'
        );
      }
      const harRiktigPrefix = verdi.startsWith(apiNavnPrefiksMap[resultat]);

      return harRiktigPrefix
        ? true
        : `Begrunnelseresultat er ${resultat}. Apinavnet må derfor starte med ${apiNavnPrefiksMap[resultat]}.`;
    }),
  ];
};
