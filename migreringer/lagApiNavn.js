import client from 'part:@sanity/base/client';
import formaterTilCamelCase from '../utils/formaterTilCamelCase';
import { Konstanter } from '../src/util/konstanter';

// Run this script with:
// `SANITY_STUDIO_API_DATASET=<Dataset you want to change> sanity exec --with-user-token migreringer/idTilVisningsnavn.js`
//
// This example shows how you may write a migration script that renames a field (innhold => nynorsk)
// on a specific document type (author).
// This will migrate documents in batches of 100 and continue patching until no more documents are
// returned from the query.
//s
// This script can safely be run, even if documents are being concurrently modified by others.
// If a document gets modified in the time between fetch => submit patch, this script will fail,
// but can safely be re-run multiple times until it eventually runs out of documents to migrate.

// A few things to note:s
// - This script will exit if any of the mutations fail due to a revision mismatch (which means the
//   document was edited between fetch => update)
// - The query must eventually return an empty set, or else this script will continue indefinitely

// Fetching documents that matches the precondition for the migration.
// NOTE: This query should eventually return an empty set of documents to mark the migration
// as complete
const fetchDocuments = () => client.fetch(`*[defined(visningsnavn)] {_id, _rev, visningsnavn}`);

const buildPatches = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      set: {
        apiNavn: formaterTilCamelCase(doc.visningsnavn).slice(0, Konstanter.API_NAME_MAX_LENGTH),
      },
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }));

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction());

const commitTransaction = tx => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  console.log(documents);
  const patches = buildPatches(documents);
  if (patches.length === 0) {
    console.log('No more documents to migrate!');
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n'),
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return;
};

migrateNextBatch().catch(err => {
  console.error(err);
  process.exit(1);
});