import { Col } from "react-bootstrap";
import styled from "styled-components";

export const Footer = styled.footer`
  padding: 40px 20px;
  background: var(--background-secondary, #475c6d);
  bottom: 0;
  width: 100%;

  @media (min-width: 768px) {
    padding: 30px 15%;
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: red;
    transition: 200ms ease-in;
  }
`;

export const FooterText = styled.p`
  color: #fff;
`;

export const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 0px;
`;
export const SubHeading = styled.p`
  color: #fff;
`;

export const FooterCol = styled(Col)`
  width: fit-content;
  max-width: fit-content;
`;
