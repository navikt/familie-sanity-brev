import AvansertDelmal from './schemas/avansertDokument/AvansertDelmal';
import AvansertDokument from './schemas/avansertDokument/AvansertDokument';
import { Fritekstområde } from './schemas/avansertDokument/fritekstområde';
import BaBegrunnelse from './schemas/baks/begrunnelse/ba-sak/begrunnelse';
import KsBegrunnelse from './schemas/baks/begrunnelse/ks-sak/begrunnelse';
import Periode from './schemas/baks/periode';
import Delmal from './schemas/Delmal';
import Dokument from './schemas/Dokument';
import Flettefelt from './schemas/felter/Flettefelt';
import Htmlfelt from './schemas/felter/Htmlfelt';
import Valgfelt from './schemas/felter/Valgfelt';

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
