import sanityClient from 'part:@sanity/base/client';

interface IPatch {
  id: string;
  patch: object;
}

export const createTransaction = (patches: IPatch[]) => {
  const transaction = sanityClient.transaction();
  patches.forEach(patch => {
    transaction.patch(patch.id, patch.patch);
  });
  return transaction;
};

export const commitTransaction = transaction => transaction.commit();
