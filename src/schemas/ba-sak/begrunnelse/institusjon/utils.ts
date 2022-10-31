import { BegrunnelseDokumentNavn } from '../../../../util/typer';
import { Behandlingstema, Vilkår, VilkårTriggere } from '../typer';

export const erInstitusjonsBegrunnelse = document =>
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA] &&
  document[BegrunnelseDokumentNavn.BEHANDLINGSTEMA].includes(Behandlingstema.NASJONAL_INSTITUSJON);

export const lagInstitusjonVilkårRegel = rule =>
  rule.custom((nåVerdi, context) => {
    if (erInstitusjonsBegrunnelse(context.document) && nåVerdi !== undefined) {
      return nåVerdi.includes(Vilkår.UTVIDET_BARNETRYGD)
        ? 'Utvidet barnetrygd er ikke i bruk i institusjonssaker'
        : true;
    }
    return true;
  });
