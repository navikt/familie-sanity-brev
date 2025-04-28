import styled from 'styled-components';
import * as React from 'react';
import { useSanityQuery } from '../util/sanity';
import { Badge, Inline } from '@sanity/ui';
import { PortableText } from '@portabletext/react';

const DelmalBlockComponent = (props: any, maalform: string, id = '', skalHaPadding = true) => {
  if (id) {
    return DelmalBlock(props, maalform, id, skalHaPadding);
  } else {
    return <ErrorStyling>Fyll ut delmal.</ErrorStyling>;
  }
};

const DelmalBlock = (props: any, maalform: string, id = '', skalHaPadding = true) => {
  const query = `*[_id=="${id}"]{..., ${maalform}[]{..., valgReferanse->}}`;
  const { data, error } = useSanityQuery(query);

  if (error) {
    console.error(error);
    return <ErrorStyling>Det skjedde en feil.</ErrorStyling>;
  }

  if (!data) {
    return <TekstFelt>Laster delmalen..</TekstFelt>;
  }

  if (!data.length) {
    return <ErrorStyling>Delmalen finnes ikke.</ErrorStyling>;
  }

  if (!data[0][maalform]) {
    return <ErrorStyling>Delmalen har ingen tekst for denne målformen.</ErrorStyling>;
  }

  const ValgfeltBadgeWrapper = styled(Inline)`
    margin-top: 1rem;
  `;

  const ValgfeltBadge = styled(Badge)`
    background-color: #dab5cf;
    color: black;
  `;

  const DelmalTittelBadge = styled(Badge)`
    margin-bottom: 1rem;
  `;

  return (
    <TekstFelt {...props} skalHaPadding={skalHaPadding}>
      <DelmalTittelBadge tone="primary">Delmal: {data[0].visningsnavn}</DelmalTittelBadge>
      <PortableText
        value={data[0][maalform]}
        components={{
          marks: {
            flettefelt: (props: any) => <Felttelfelt>{props.children}</Felttelfelt>,
            delmal: (props: any) => <Delmal>{props.children}</Delmal>,
            valgfelt: (props: any) => <Valgfelt>{props.children}</Valgfelt>,
            lenke: (props: any) => <Lenke>{props.children}</Lenke>,
            hoyrestill: (props: any) => <Høyrestill>{props.children}</Høyrestill>,
          },
          types: {
            dokumentliste: (props: any) => props.children,
            delmalBlock: (props: any) =>
              DelmalBlockComponent(props, maalform, props.value.delmalReferanse._ref, false),
            valgBlock: (props: any) => (
              <ValgfeltBadgeWrapper>
                <ValgfeltBadge>
                  {'Valgfelt: '} {props.value.valgReferanse.visningsnavn}
                </ValgfeltBadge>
              </ValgfeltBadgeWrapper>
            ),
            htmlfelt: () => <h3>Html</h3>,
          },
        }}
      />
    </TekstFelt>
  );
};

const TekstFelt = styled.div<{ skalHaPadding?: boolean }>`
  padding: ${props => (props.skalHaPadding ? '0.75rem' : 0)};
  overflow: auto;
`;

const Felttelfelt = styled.span`
  background-color: rgba(30, 133, 209, 0.2);
`;

const Delmal = styled.span`
  background-color: rgba(183, 177, 100, 0.2);
`;

const Valgfelt = styled.span`
  background-color: rgba(180, 106, 161, 0.5);
`;

const ErrorStyling = styled(TekstFelt)`
  color: #f03e2f;
`;

const Lenke = styled.span`
  background-color: rgba(97, 78, 116, 0.3);
`;

const Høyrestill = styled.span`
  float: right;
`;

export default DelmalBlockComponent;
