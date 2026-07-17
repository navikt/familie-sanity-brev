import { Rule } from 'sanity';
import { apiNavnValideringer } from '../../../../util/valideringer';
import { DokumentNavn } from '../../../../util/typer';
import { Resultat } from './resultat';

const apiNavnPrefiksMap: Record<Resultat, string> = {
  AVSLAG: 'avslag',
  FORTSATT_INNVILGET: 'fortsattInnvilget',
  INNVILGET: 'innvilget',
  OPPHØR: 'opphor',
  REDUKSJON: 'reduksjon',
  ENDRET_UTBETALINGSPERIODE: 'endretUtbetaling',
  ETTER_ENDRET_UTBETALINGSPERIODE: 'etterEndretUtbetaling',
};

export const apiNavnValideringerBegrunnelse = (rule: Rule, type: string) => {
  return [
    ...apiNavnValideringer(rule, type as DokumentNavn),
    rule.custom((verdi: string, kontekst: { document?: Record<string, any> }): true | string => {
      const resultat: Resultat = kontekst.document?.resultat;

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
