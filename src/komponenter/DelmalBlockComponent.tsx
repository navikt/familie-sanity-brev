import styled from 'styled-components';
import * as React from 'react';
import { useSanityQuery } from '../util/sanity';
import { Valgblokker } from './ValgfeltBlockComponent';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BlockContent = require('@sanity/block-content-to-react');

const DelmalBlockComponent = (props: any, maalform: string, id = '', skalHaPadding = true) => {
  const _id = id;

  if (!_id) {
    return <ErrorStyling>Fyll ut delmal.</ErrorStyling>;
  }

  const query = `*[_id=="${_id}"]`;
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

  return (
    <TekstFelt {...props} skalHaPadding={skalHaPadding}>
      <BlockContent
        blocks={data[0][maalform]}
        serializers={{
          marks: {
            flettefelt: (props: any) => <Felttelfelt>{props.children}</Felttelfelt>,
            delmal: (props: any) => <Delmal>{props.children}</Delmal>,
            valgfelt: (props: any) => <Valgfelt>{props.children}</Valgfelt>,
            lenke: (props: any) => <Lenke>{props.children}</Lenke>,
            hoyrestill: (props: any) => <Høyrestill>{props.children}</Høyrestill>,
          },
          types: {
            dokumentliste: (props: any) => props.children,
            block: BlockSerializer,
            delmalBlock: (props: any) =>
              DelmalBlockComponent(props, maalform, props.node.delmalReferanse._ref, false),
            valgBlock: (props: any) => <h1>{'Valgfelt'}</h1>,
            htmlfelt: (props: any) => <h3>Html</h3>,
          },
        }}
      />
    </TekstFelt>
  );
};

const settTag = (node: any) => {
  const style = node.style;

  if (RegExp('/?h[1-6]').test(style)) {
    return style;
  }

  return 'div';
};

const BlockSerializer = (props: any) => {
  const Tag = settTag(props.node);

  return (
    <Tag style={{ minHeight: '1rem' }} className={`block`}>
      {props.children}
    </Tag>
  );
};

const TekstFelt = styled.div`
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
