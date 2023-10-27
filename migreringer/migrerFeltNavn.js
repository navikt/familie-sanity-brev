import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN_PAT; //hentes fra .env-fil eks: SANITY_TOKEN_PAT=superhemmeligtoken1234
const projectId = 'xsrv1mh6';
const dataset = 'ba-test';
const apiVersion = '2023-03-01';

async function migrerAlleFelt() {
  await migrate();
}

const client = createClient({
  apiVersion,
  projectId,
  dataset,
  token,
});

// Dette er et ustabilt script. Dvs at det ofte feiler og må rekjøres flere ganger før det går.
//
// Run this script from within your project folder in your terminal with: `sanity exec --with-user-token migrations/renameField.js`
//
// This example shows how you may write a migration script that renames a field (name => fullname)
// on a specific document type (author).
// This will migrate documents in batches of 100 and continue patching until no more documents are
// returned from the query.
//
// This script can safely be run, even if documents are being concurrently modified by others.
// If a document gets modified in the time between fetch => submit patch, this script will fail,
// but can safely be re-run multiple times until it eventually runs out of documents to migrate.

// A few things to note:
// - This script will exit if any of the mutations fail due to a revision mismatch (which means the
//   document was edited between fetch => update)
// - The query must eventually return an empty set, or else this script will continue indefinitely

// Fetching documents that matches the precondition for the migration.
// NOTE: This query should eventually return an empty set of documents to mark the migration
// as complete
var fetchDocuments = gammeltNavn =>
  client.fetch(`*[_type == 'begrunnelse' && defined(${gammeltNavn})] {_id, _rev, ${gammeltNavn}}`);

const buildPatchesForRegelverk = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      //set: { regelverk: doc.tema },
      unset: ['tema'],
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }));

const buildPatchesForBrevPeriodeType = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      //set: { brevPeriodeType: doc.periodeType },
      unset: ['periodeType'],
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }));

const buildPatchesForPeriodeResultatForPerson = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      //set: { periodeResultatForPerson: doc.vedtakResultat },
      unset: ['vedtakResultat'],
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }));

const buildPatchesForBegrunnelseTypeForPerson = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      //set: { begrunnelseTypeForPerson: doc.begrunnelsetype },
      unset: ['begrunnelsetype'],
      // this will cause the transaction to fail if the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev,
    },
  }));

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction());

const commitTransaction = tx => tx.commit();

const migrate = async () => {
  let documents = await fetchDocuments('vedtakResultat');
  const vedtakResultatPatch = buildPatchesForPeriodeResultatForPerson(documents);
  console.log(
    `\nMigrating vedtakResultat:\n %s`,
    vedtakResultatPatch.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n'),
  );
  const transactionVedtakResultat = createTransaction(vedtakResultatPatch);
  await commitTransaction(transactionVedtakResultat);

  documents = await fetchDocuments('begrunnelsetype');
  const periodeTypePatch = buildPatchesForBegrunnelseTypeForPerson(documents);
  console.log(
    `Migrating begrunnelsetype:\n %s`,
    periodeTypePatch.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n'),
  );
  const transactionPeriodeType = createTransaction(periodeTypePatch);
  await commitTransaction(transactionPeriodeType);

  documents = await fetchDocuments('periodeType');
  const begrunnelsetypePatch = buildPatchesForBrevPeriodeType(documents);
  console.log(
    `Migrating brevperiodetype:\n %s`,
    begrunnelsetypePatch.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n'),
  );
  const transactionbegrunnelseType = createTransaction(begrunnelsetypePatch);
  await commitTransaction(transactionbegrunnelseType);

  documents = await fetchDocuments('tema');
  const regelverkPatch = buildPatchesForRegelverk(documents);
  console.log(
    `Migrating tema:\n %s`,
    regelverkPatch.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n'),
  );
  const transactionbehandlingsTema = createTransaction(regelverkPatch);
  await commitTransaction(transactionbehandlingsTema);

  //return migrate();
  return null;
};

migrerAlleFelt().catch(err => {
  console.error(err);
  process.exit(1);
});
