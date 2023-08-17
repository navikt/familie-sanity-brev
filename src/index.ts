import Flettefelt from './schemas/felter/Flettefelt';
import AvansertDokument from './schemas/avansertDokument/AvansertDokument';
import AvansertDelmal from './schemas/avansertDokument/AvansertDelmal';
import Valgfelt from './schemas/felter/Valgfelt';
import Dokument from './schemas/Dokument';
import Delmal from './schemas/Delmal';
import Periode from './schemas/baks/periode';
import BaBegrunnelse from './schemas/baks/begrunnelse/ba-sak/begrunnelse';
import KsBegrunnelse from './schemas/baks/begrunnelse/ks-sak/begrunnelse';
import Htmlfelt from './schemas/felter/Htmlfelt';
import { Fritekstområde } from './schemas/avansertDokument/fritekstområde';

export const schemaTypes = [
  Delmal,
  Dokument,
  Flettefelt,
  Htmlfelt,
  Valgfelt,
  Periode,
  BaBegrunnelse,
  KsBegrunnelse,
  AvansertDelmal,
  AvansertDokument,
  Fritekstområde,
];
