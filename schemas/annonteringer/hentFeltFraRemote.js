import { client } from "../../utils/sanity";

export default async (feltId, relevantFelt) => {
  const cachedHits = sessionStorage.getItem(feltId);
  if (cachedHits) {
    return JSON.parse(cachedHits)[relevantFelt];
  } else {
    return client.fetch(`*[_id == "${feltId}"][0]`).then((res) => {
      sessionStorage.setItem(feltId, JSON.stringify(res));
      return res[relevantFelt];
    });
  }
};
