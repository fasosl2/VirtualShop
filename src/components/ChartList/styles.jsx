import styled from "styled-components";
import {
  Col as ColBS,
  Row as RowBS,
  Button as ButtonBS,
  Container as ContainerBS,
  Image as ImageBS,
} from "react-bootstrap";
import { ListGroup,  Dropdown } from "react-bootstrap";
import { Link as LinkBS } from "react-router-dom";

export const Link = styled(LinkBS).attrs({
  className:"btn text-decoration-none mt-3 mb-2 d-flex justify-content-center align-items-center"
})`
  color: white;
  background-color: rgba(71, 91, 109);
  font-size: 0.8rem;
  min-height: 40px;
  width: 100%;
  border-radius: 14px;
  &:hover {
    background-color: rgba(71, 91, 109); 
    color: white;
  }
`;

export const DropdownItem = styled(Dropdown.Item).attrs({
  className:"dropdown-toggle-no-hover p-0"
})`
&:hover {
  background-color: transparent; 
}
`

export const ListGroupBSItem = styled(ListGroup.Item).attrs((props) => ({
  className: props.compact ? "border-0 " : "border-0 border-bottom",
}))`
  ${(props) =>
    props.compact
      ? "padding: 4% 0;" : ""}

  boder-radius: 0;
`;

export const Image = styled(ImageBS)`
  ${(props) =>
    props.compact
      ? `
  
  border-radius: 13px;
  width: 80px;
  height: 80px;
  `
      : `

  border-radius: 16px;
  max-height: 70px;
  
  `}
`;

export const Button = styled(ButtonBS)`
  font-size: 0.8rem;
`;

export const ButtonLink = styled(ButtonBS).attrs({
  variant: "link",
  className: "text-decoration-none",
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
  className: "d-flex justify-content-center align-items-start",
})`
  color: #475c6d;
  font-size: 0.8rem;
`;

export const RowTitle = styled(RowBS).attrs((props) => ({
  className: props.compact ? " pt-3 pl-2 mb-2" : "border-bottom  pt-3 pb-3 pl-2  m-0",
}))`
  ${(props) => props.compact ? 
    `
  border-bottom: 1px solid rgba(0, 142, 204, 0.5);
  margin: 0;

  ` 
  : ''}
`;

export const RowBody = styled(RowBS).attrs({
  className: "p-0 m-0",
})``;

export const RowFooter = styled(RowBS).attrs((props) => ({
  className: props.compact
    ? `
    `
    : "p-0 m-0 d-flex justify-content-center align-items-center",
}))`
  ${(props) =>
    props.compact ? "border-top: 1px solid rgba(0, 142, 204, 0.5);" : "background-color: rgba(71, 91, 109, 0.1);"}
`;

export const ContentSection = styled.div`
  ${(props) =>
    props.compact
      ? ""
      : `
  border: 1px solid rgba(71, 91, 109, 0.3);
  margin: 30px 0;
  border-radius: 8px;
  `}
`;

export const Container = styled(ContainerBS)`
  display: flex;
  justify-content: center;
`;

export const Title5 = styled.h5`
  font-size: 0.9rem;
`;
