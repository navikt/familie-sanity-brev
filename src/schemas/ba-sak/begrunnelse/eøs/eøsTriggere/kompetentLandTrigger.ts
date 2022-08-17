import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { erEøsBegrunnelse, hentEØSTriggereRegler, kanKompetanseTriggereVelges } from './utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

enum Kompetanse {
  NORGE_ER_PRIMÆRLAND = 'NORGE_ER_PRIMÆRLAND',
  NORGE_ER_SEKUNDÆRLAND = 'NORGE_ER_SEKUNDÆRLAND',
  TO_PRIMÆRLAND = 'TO_PRIMÆRLAND',
}

const KompetanseValg: Record<Kompetanse, { title: string; value: Kompetanse }> = {
  NORGE_ER_PRIMÆRLAND: {
    title: 'Norge er primærland',
    value: Kompetanse.NORGE_ER_PRIMÆRLAND,
  },
  NORGE_ER_SEKUNDÆRLAND: {
    title: 'Norge er sekundærland',
    value: Kompetanse.NORGE_ER_SEKUNDÆRLAND,
  },
  TO_PRIMÆRLAND: {
    title: 'To primærland',
    value: Kompetanse.TO_PRIMÆRLAND,
  },
};

export const kompetentLandTrigger = {
  title: 'Kompetent land',
  type: SanityTyper.ARRAY,
  name: EØSBegrunnelseDokumentNavn.KOMPETANSE_RESULTAT,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: Object.values(Kompetanse).map(kompetanse => KompetanseValg[kompetanse]),
  },
  hidden: ({ document }) => !erEøsBegrunnelse(document) || !kanKompetanseTriggereVelges(document),
  validation: rule => hentEØSTriggereRegler(rule, true, [EØSTriggerType.KOMPETANSE]),
};
