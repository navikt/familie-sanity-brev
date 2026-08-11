import { Rule } from 'sanity';
import { BegrunnelseDokumentNavn, Menyvalg, SanityTyper } from '../../../../../util/typer';
import { Begrunnelse } from '../typer';
import { erSakspesifikkBegrunnelse } from './valgbarhet';

export enum FagsakType {
  STANDARD = 'STANDARD',
  INSTITUSJON = 'INSTITUSJON',
  ENSLIG_MINDREÅRIG = 'ENSLIG_MINDREÅRIG',
}

export const fagsaktypeTilMenyValg = (fagsaktype: FagsakType): Menyvalg<FagsakType> => {
  const fagsaktypeTilMenynavn = (fagsaktype: FagsakType): string => {
    switch (fagsaktype) {
      case FagsakType.STANDARD:
        return 'Standard';
      case FagsakType.INSTITUSJON:
        return 'Institusjon';
      case FagsakType.ENSLIG_MINDREÅRIG:
        return 'Enslig mindreårig';
    }
  };

  return { title: fagsaktypeTilMenynavn(fagsaktype), value: fagsaktype };
};

export const fagsakType = {
  title: 'Fagsaktype',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.FAGSAK_TYPE,
  options: {
    list: Object.values(FagsakType).map(valgbarhet => fagsaktypeTilMenyValg(valgbarhet)),
  },
  hidden: (context: { document?: Record<string, unknown> }) =>
    !erSakspesifikkBegrunnelse(context.document as Begrunnelse),
  validation: (rule: Rule) => [erFagsakspesifikkRegel(rule)],
};

export const erFagsakspesifikkRegel = (rule: Rule) =>
  rule.custom((nåVerdi, context) => {
    const begrunnelse = context.document as Begrunnelse;
    const feltErSattMenErIkkeSakspesifikkBegrunnelse =
      !erSakspesifikkBegrunnelse(begrunnelse) && nåVerdi;

    return feltErSattMenErIkkeSakspesifikkBegrunnelse
      ? 'Kan kun velge fagsaktype når valgbarhet er satt til "sakspesifikk"'
      : true;
  });
