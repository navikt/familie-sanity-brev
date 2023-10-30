import { apiNavnValideringer } from '../../../../util/valideringer';
import { BegrunnelsestypeForPerson } from './sanityMappeFelt/begrunnelsetypeForPerson';

const apiNavnPrefiksMap: Record<BegrunnelsestypeForPerson, string> = {
  AVSLAG: 'avslag',
  ENDRET_UTBETALING: 'endretUtbetaling',
  ETTER_ENDRET_UTBETALING: 'etterEndretUtbetaling',
  FORTSATT_INNVILGET: 'fortsattInnvilget',
  INNVILGET: 'innvilget',
  OPPHØR: 'opphor',
  REDUKSJON: 'reduksjon',
};

export const apiNavnValideringerBegrunnelse = (rule, type) => {
  return [
    ...apiNavnValideringer(rule, type),
    rule.custom((verdi: string, kontekst): true | string => {
      const begrunnelsestype = kontekst.document.begrunnelseTypeForPerson;

      if (!Object.values(BegrunnelsestypeForPerson).includes(begrunnelsestype)) {
        return (
          'Begrunnelsestypen er ikke satt og valideringen for Apinavnet avhenger av begrunnelsestypen. ' +
          'Sett begrunnelsestype før du setter apiNavn.'
        );
      }
      const harRiktigPrefix = verdi.startsWith(apiNavnPrefiksMap[begrunnelsestype]);

      return harRiktigPrefix
        ? true
        : `Begrunnelsen er av typen ${begrunnelsestype}. Apinavnet må derfor starte med ${apiNavnPrefiksMap[begrunnelsestype]}.`;
    }),
  ];
};
