import * as React from 'react';
import { useSanityQuery } from '../../util/sanity';
import { Header, ErrorStyling } from './Elementer';
import { SanityDocument, useGetFormValue } from 'sanity';
import { IntentLink } from 'sanity/router';

type IReferrer = {
  stikkord?: string[];
  visningsnavn: string;
  _id: string;
  _type: string;
};

function HvorErDelmalenIBruk(props: any, x: any, y: any, z: any) {
  const getFormValue = useGetFormValue();
  const dokument = getFormValue([]) as SanityDocument;
  const documentId = dokument._id;

  const query = `*[references("${documentId}")]`;
  const { data, error } = useSanityQuery(query);

  if (error) {
    console.error(error);
    return <ErrorStyling>Det skjedde en feil.</ErrorStyling>;
  }

  if (!data) {
    return <div>Sjekker om delmalen er i bruk..</div>;
  }

  const unike = data.filter(ref => !ref._id.includes('drafts'));
  if (!unike.length) {
    return (
      <Header {...props}>
        Denne delmalen er ikke i bruk{' '}
        <span role="img" aria-label="Gråte-emoji">
          😢
        </span>
      </Header>
    );
  }

  return (
    <div {...props}>
      <div>Denne delmalen er brukt {unike.length} steder:</div>
      <ul>
        {unike.map((ref: IReferrer) => {
          return (
            <li key={ref._id}>
              <IntentLink intent={'edit'} params={{ id: ref._id, type: ref._type }}>
                {ref.visningsnavn}
              </IntentLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HvorErDelmalenIBruk;
