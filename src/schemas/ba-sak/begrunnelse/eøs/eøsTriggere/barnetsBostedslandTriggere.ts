import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../../util/typer';
import { erEøsBegrunnelse, hentEØSTriggereRegler } from './utils';

enum BarnetsBostedsland {
  NORGE = 'NORGE',
  IKKE_NORGE = 'IKKE_NORGE',
}

const BarnetsBostedslandValg: Record<
  BarnetsBostedsland,
  { title: string; value: BarnetsBostedsland }
> = {
  NORGE: { title: 'Norge', value: BarnetsBostedsland.NORGE },
  IKKE_NORGE: { title: 'Ikke norge', value: BarnetsBostedsland.IKKE_NORGE },
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
  hidden: ({ document }) => !erEøsBegrunnelse(document),
  validation: rule => hentEØSTriggereRegler(rule),
};
