// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import createSchema from 'part:@sanity/base/schema-creator';
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas

import Flettefelt from './schemas/felter/Flettefelt';
import AvansertDokument from './schemas/avansertDokument/AvansertDokument';
import AvansertDelmal from './schemas/avansertDokument/AvansertDelmal';
import Valgfelt from './schemas/felter/Valgfelt';
import Dokument from './schemas/Dokument';
import Delmal from './schemas/Delmal';
import Periode from './schemas/ba-sak/periode';

sessionStorage.clear();

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.

    Delmal,
    Dokument,
    Flettefelt,
    Valgfelt,
    Periode,
    AvansertDelmal,
    AvansertDokument,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ]),
});