import { useEffect, useState } from "react";

const sanityClient = require("@sanity/client");

export const client = (datasett) =>
  sanityClient({
    projectId: "xsrv1mh6",
    dataset: datasett,
    useCdn: true,
  });

export async function hentFraSanity(query) {
  const datasett = window.location.pathname.split("/")[1];
  const key = datasett + ";" + query;
  const cachedHits = sessionStorage.getItem(key);

  if (cachedHits) {
    return JSON.parse(cachedHits);
  } else {
    const response = await client(datasett).fetch(query);
    sessionStorage.setItem(key, JSON.stringify(response));
    return response;
  }
}

export function useSanityQuery(query) {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    hentFraSanity(query)
      .then((response) => setData(response))
      .catch((error) => setError(error));
  }, []);

  return { data, error };
}
