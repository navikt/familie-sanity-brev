import { useEffect, useState } from "react";

const sanityClient = require("@sanity/client");

export const client = (datasett, brukCache) =>
  sanityClient({
    projectId: "xsrv1mh6",
    dataset: datasett,
    useCdn: brukCache,
  });

export async function hentFraSanity(query, brukCache = true) {
  const datasett = window.location.pathname.split("/")[1];
  const key = datasett + ";" + query;
  const cachedHits = sessionStorage.getItem(key);

  if (cachedHits) {
    return JSON.parse(cachedHits);
  } else {
    const response = await client(datasett, brukCache).fetch(query);
    sessionStorage.setItem(key, JSON.stringify(response));
    return response;
  }
}

export function useSanityQuery(query, brukCache = true) {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    hentFraSanity(query, brukCache)
      .then((response) => setData(response))
      .catch((error) => setError(error));
  }, []);

  return { data, error };
}
