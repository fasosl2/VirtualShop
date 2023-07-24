import styled from 'styled-components';
import {
  Col as ColBS,
  Row as RowBS,
  Button as ButtonBS,
  Container as ContainerBS,
  Image as ImageBS,
} from "react-bootstrap";


export const ChartPageContainer = styled(ContainerBS)`
    width: 100%;
@media screen and (min-width: 768px){
    width: 70%;
}    
`;


export const Image = styled(ImageBS)`
  border-radius: 16px;
  max-height: 70px;
`;

export const Button = styled(ButtonBS)`
  font-size: 0.8rem;
`;
export const ButtonLink = styled(ButtonBS).attrs({
  variant:"link", className:"text-decoration-none"
})`
  font-size: 0.8rem;
`;

export const Row = styled(RowBS)`
  color: #475c6d;
  font-size: 0.8rem;
`;

export const Col = styled(ColBS)`
  color: #475c6d;
  font-size: 0.9rem;
`;
export const ColListGroup = styled(ColBS).attrs({
  className:"d-flex justify-content-center align-items-center"
  })`
    color: #475c6d;
    font-size: 0.8rem;
  `;

export const RowTitle = styled(RowBS).attrs({
  className: "border-bottom  pt-3 pb-3 pl-2  m-0"
})``;

export const RowBody = styled(RowBS).attrs({
    className: "p-0 m-0"
})``;
export const RowFooter = styled(RowBS).attrs({
    className: "p-0 m-0pt-3 pb-3 pl-2 m-0"
})`
    background-color: rgba(71, 91, 109, 0.1);
`;

export const ContentSection = styled.div`
  border: 1px solid rgba(71, 91, 109, 0.3);
  margin: 30px 0;
  border-radius: 8px;
`;

export const Container = styled(ContainerBS)`
  display: flex;
  justify-content: center;
`;

export const Title5 = styled.h5`
  font-size: 0.9rem;
`;
