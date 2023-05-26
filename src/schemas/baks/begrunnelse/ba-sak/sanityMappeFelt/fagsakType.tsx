import { BegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { Begrunnelse } from '../typer';
import { erSakspesifikkBegrunnelse } from './valgbarhet';

export enum FagsakType {
  STANDARD = 'STANDARD',
  INSTITUSJON = 'INSTITUSJON',
  ENSLIG_MINDREÅRIG = 'ENSLIG_MINDREÅRIG',
}

export const fagsaktypeTilMenynavn: Record<
  FagsakType,
  {
    title: string;
    value: FagsakType;
  }
> = {
  STANDARD: { title: 'Standard', value: FagsakType.STANDARD },
  INSTITUSJON: { title: 'Institusjon', value: FagsakType.INSTITUSJON },
  ENSLIG_MINDREÅRIG: { title: 'Enslig mindreårig', value: FagsakType.ENSLIG_MINDREÅRIG },
};

export const fagsakType = {
  title: 'Fagsaktype',
  type: SanityTyper.STRING,
  name: BegrunnelseDokumentNavn.FAGSAK_TYPE,
  options: {
    list: Object.values(FagsakType).map(valgbarhet => fagsaktypeTilMenynavn[valgbarhet]),
  },
  hidden: context => !erSakspesifikkBegrunnelse(context.document),
  validation: rule => [erFagsakspesifikkRegel(rule)],
};

export const erFagsakspesifikkRegel = rule =>
  rule.custom((nåVerdi, context) => {
    const begrunnelse: Begrunnelse = context.document;

    if (erSakspesifikkBegrunnelse(begrunnelse)) {
      return nåVerdi ? true : 'Må velge fagsaktype når valgbarhet er satt til "sakspesifikk"';
    }
    return true;
  });
