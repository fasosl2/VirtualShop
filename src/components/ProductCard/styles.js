import styled from "styled-components";
import { Card as CardBS, Col, Row } from "react-bootstrap";

export const CardHeader = styled(CardBS.Header)`
  border-radius: 16px 16px 0px 0px;
  background: var(--primary-red-00, #d61b26);
  color: white;
`;
export const CardPrice = styled(CardBS.Title)`
    text-align: end;
`;

export const CardButtomContainer = styled.div`
    display: flex;
    justify-content: center;
`;