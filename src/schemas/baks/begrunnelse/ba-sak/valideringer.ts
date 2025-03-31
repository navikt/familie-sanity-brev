import { apiNavnValideringer } from '../../../../util/valideringer';
import { BegrunnelseType } from './sanityMappeFelt/begrunnelseType';

const apiNavnPrefiksMap: Record<BegrunnelseType, string> = {
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
      const begrunnelsestype = kontekst.document.begrunnelseType;

      if (!Object.values(BegrunnelseType).includes(begrunnelsestype)) {
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
