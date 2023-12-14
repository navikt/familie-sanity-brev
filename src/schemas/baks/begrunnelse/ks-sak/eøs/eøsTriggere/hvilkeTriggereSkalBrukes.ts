import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../../util/typer';
import { erEøsBegrunnelse } from './utils';

export enum EØSTriggerType {
  KOMPETANSE = 'KOMPETANSE',
  VILKÅRSVURDERING = 'VILKÅRSVURDERING',
}

const KompetanseValg: Record<EØSTriggerType, { title: string; value: EØSTriggerType }> = {
  KOMPETANSE: {
    title: 'Kompetanse',
    value: EØSTriggerType.KOMPETANSE,
  },
  VILKÅRSVURDERING: {
    title: 'Vilkårsvurdering',
    value: EØSTriggerType.VILKÅRSVURDERING,
  },
};

export const hvilkeTriggereSkalBrukes = {
  title: 'Hvilke triggere skal brukes?',
  type: SanityTyper.ARRAY,
  name: EØSBegrunnelseDokumentNavn.TRIGGERE_I_BRUK,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: Object.values(EØSTriggerType).map(eøsTrigger => KompetanseValg[eøsTrigger]),
  },
  hidden: ({ document }) => !erEøsBegrunnelse(document),
};
