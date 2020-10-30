import { client } from "../../utils/sanity";

export default async (feltId, relevantFelt = "felt") => {
  const cachedHits = sessionStorage.getItem(feltId);
  if (cachedHits) {
    return cachedHits;
  } else {
    return client.fetch(`*[_id == "${feltId}"][0]`).then((res) => {
      sessionStorage.setItem(feltId, res[relevantFelt]);
      return res[relevantFelt];
    });
  }
};
