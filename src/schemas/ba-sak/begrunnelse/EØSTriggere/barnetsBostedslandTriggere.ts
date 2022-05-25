import { EØSBegrunnelseDokumentNavn, SanityTyper } from '../../../../util/typer';
import { erEøsBegrunnelse, hentEØSTriggereRegler } from './utlis';

enum BarnetsBostedsland {
  NORGE = 'NORGE',
}

const BarnetsBostedslandValg: Record<
  BarnetsBostedsland,
  { title: string; value: BarnetsBostedsland }
> = {
  NORGE: { title: 'Norge', value: BarnetsBostedsland.NORGE },
};

export const barnetsBosteslandTrigger = {
  title: 'Barnets bostedsland',
  type: SanityTyper.ARRAY,
  name: EØSBegrunnelseDokumentNavn.BARNETS_BOSTEDSLAND_TRIGGER,
  of: [{ type: SanityTyper.STRING }],
  options: {
    list: Object.values(BarnetsBostedsland).map(
      barnetsBostedsland => BarnetsBostedslandValg[barnetsBostedsland],
    ),
  },
  hidden: ({ document }) => !erEøsBegrunnelse(document),
  validation: rule => hentEØSTriggereRegler(rule),
};
