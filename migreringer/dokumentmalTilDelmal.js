import client from "part:@sanity/base/client";

const fetchDocuments = () => client.fetch(`*[_type == 'liste'] {...}`);

const buildDocuments = (docs) => {
  return docs.map((doc) => ({
    ...doc,
    _type: "delmal",
    _id: undefined,
    tittelBokmaal: undefined,
    tittelNynorsk: undefined,
  }));
};

const createTransaction = (docsToCreate) => {
  let transaction = docsToCreate.reduce(
    (tx, doc) => tx.create(doc),
    client.transaction()
  );
  return transaction;
};

const deleteTransaction = (docs) =>
  docs.reduce((tx, doc) => tx.delete(doc._id), client.transaction());

const commitTransaction = (tx) => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const newDocuments = buildDocuments(documents);
  const transaction = createTransaction(newDocuments);
  //await commitTransaction(transaction);
  await commitTransaction(deleteTransaction(documents));
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
