import styled from 'styled-components';
import * as React from 'react';
import { useSanityQuery } from '../util/sanity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BlockContent = require('@sanity/block-content-to-react');

const ValgfeltBlockComponent = (props: any, maalform: string) => {
  const id = props.value._id;

  const query = `*[_id=="${id}"][0]{"valgmulighet": valg[].valgmulighet,"delmaler": valg[].delmal->["${maalform}"]}`;

  const { data, error } = useSanityQuery(query);

  if (error) {
    console.error(error);
    return <ErrorStyling>Det skjedde en feil.</ErrorStyling>;
  }

  if (!(data && data.delmaler)) {
    return <TekstFelt>Laster delmalen..</TekstFelt>;
  }

  if (!data.delmaler.length || data.delmaler.length !== data.valgmulighet.length) {
    return <ErrorStyling>Feil format på valgfeltet.</ErrorStyling>;
  }

  return <Valgblokker props={data} />;
};

const Valgblokker = (props: any) => {
  const { valgmulighet, delmaler } = props.props;

  return (
    <PreviewValg>
      {delmaler?.map((delmal, index) => (
        <>
          <h1>{valgmulighet[index]}</h1>
          <BlockContent blocks={delmal} />
        </>
      ))}
    </PreviewValg>
  );
};

const TekstFelt = styled.div`
  padding: ${props => (props.skalHaPadding ? '0.75rem' : 0)};
  overflow: auto;
`;

const PreviewValg = styled.div`
  padding: 0.5rem 0.75rem;
`;

const PreviewContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 0.5rem 0.75rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
`;

const ErrorStyling = styled(PreviewContainer)`
  color: #f03e2f;
`;

export default ValgfeltBlockComponent;
