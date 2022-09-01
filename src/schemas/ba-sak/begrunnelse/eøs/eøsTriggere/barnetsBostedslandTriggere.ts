import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { skalViseEøsTrigger, hentEØSTriggereRegler, kanKompetanseTriggereVelges } from './utils';
import { EØSTriggerType } from './hvilkeTriggereSkalBrukes';

enum BarnetsBostedsland {
  NORGE = 'NORGE',
  IKKE_NORGE = 'IKKE_NORGE',
}

const BarnetsBostedslandValg: Record<
  BarnetsBostedsland,
  { title: string; value: BarnetsBostedsland }
> = {
  NORGE: { title: 'Norge', value: BarnetsBostedsland.NORGE },
  IKKE_NORGE: { title: 'Ikke Norge', value: BarnetsBostedsland.IKKE_NORGE },
};

export const barnetsBosteslandTrigger = {
  title: 'Barnets bostedsland',
  type: SanityTyper.ARRAY,
  name: EØSBegrunnelseDokumentNavn.BARNETS_BOSTEDSLAND,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: Object.values(BarnetsBostedsland).map(
      barnetsBostedsland => BarnetsBostedslandValg[barnetsBostedsland],
    ),
  },
  hidden: ({ document }) => !skalViseEøsTrigger(document) || !kanKompetanseTriggereVelges(document),
  validation: rule => hentEØSTriggereRegler(rule, true, [EØSTriggerType.KOMPETANSE]),
};
