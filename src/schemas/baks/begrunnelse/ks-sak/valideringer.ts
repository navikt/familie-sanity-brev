import { apiNavnValideringer } from '../../../../util/valideringer';
import { Resultat } from './typer';

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
      const begrunnelseresultat = kontekst.document.begrunnelseresultat;

      if (!Object.values(Resultat).includes(begrunnelseresultat)) {
        return (
          'Begrunnelsesresultat er ikke satt og valideringen for Apinavnet avhenger av resultatet. ' +
          'Sett begrunnelsesresultat før du setter apiNavn.'
        );
      }
      const harRiktigPrefix = verdi.startsWith(apiNavnPrefiksMap[begrunnelseresultat]);

      return harRiktigPrefix
        ? true
        : `Begrunnelseresultat er ${begrunnelseresultat}. Apinavnet må derfor starte med ${apiNavnPrefiksMap[begrunnelseresultat]}.`;
    }),
  ];
};
