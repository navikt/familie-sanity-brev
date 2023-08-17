import styled from 'styled-components';
import * as React from 'react';
import { useSanityQuery } from '../util/sanity';
import DelmalBlockComponent from '../komponenter/DelmalBlockComponent';

const ValgfeltBlockComponent = (id: string, maalform: string) => {
  const query = `*[_id=="${id}"][0]{"valgmuligheter": valg[].valgmulighet,"delmaler": valg[].delmal->}`;

  const { data, error } = useSanityQuery(query);

  if (error) {
    console.error(error);
    return <ErrorStyling>Det skjedde en feil.</ErrorStyling>;
  }

  if (!data) {
    return <TekstFelt>Laster delmalen..</TekstFelt>;
  }

  if (!data.delmaler?.length || data.delmaler.length !== data.valgmuligheter.length) {
    return <ErrorStyling>Feil format på valgfeltet.</ErrorStyling>;
  }

  return <Valgblokker {...data} maalform={maalform} />;
};

export const Valgblokker = (props: any) => {
  const { delmaler, maalform } = props;

  return (
    <PreviewValg>
      {delmaler?.map(delmal => (
        <Valg key={delmal._id}>
          <Valgmulighet>{delmal.visningsnavn}:</Valgmulighet>
          {DelmalBlockComponent(props, maalform, delmal._id, false)}
        </Valg>
      ))}
    </PreviewValg>
  );
};

const Valg = styled.div`
  display: flex;
  flex-direction: column;
`;

const Valgmulighet = styled.h2`
  font-size: 22px;
`;

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
