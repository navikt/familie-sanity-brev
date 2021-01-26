import sanityClient from 'part:@sanity/base/client';

// Run this script with:
// `SANITY_STUDIO_API_DATASET=<Dataset you want to change> sanity exec --with-user-token migreringer/submalTilDelmal.js`
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

const fetchDocuments = () => sanityClient.fetch(`*[_type == 'dokumentmal']`);

const endreSubmalTilDelmal = (doc, maalform, patches) => {
  if (doc[maalform]) {
    doc[maalform].forEach((sanityBlock, blockIndex) => {
      if (sanityBlock._type === 'delmalBlock') {
        if (sanityBlock.submal) {
          const sanityPatch = {
            set: {},
          };
          sanityPatch.set[`${maalform}[${blockIndex}].delmal`] = sanityBlock.submal;
          sanityPatch.unset = [`${maalform}[${blockIndex}].submal`];
          patches.push({ id: doc._id, patch: sanityPatch });
        }
      }
    });
  }
};

const buildPatches = docs => {
  const patches = [];
  docs.forEach(doc => {
    endreSubmalTilDelmal(doc, 'bokmaal', patches);
    endreSubmalTilDelmal(doc, 'nynorsk', patches);
  });
  return patches;
};

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), sanityClient.transaction());

const commitTransaction = tx => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
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
