import { Col, Container, Image as ImageBS } from "react-bootstrap";
import styled from "styled-components";

export const ProductContainer = styled(Container)`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 1em 10%;
  }
`;

export const ProductCol = styled(Col)`
  //     width: 100%;
  // @media screen and (min-width: 768px){
  //     width: 100%;
  // }
`;

export const Image = styled(ImageBS)`
  border-radius: 16px;
  max-height: 70px;
`;
