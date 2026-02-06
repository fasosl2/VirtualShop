import styled from "styled-components";
import { Card as CardBS, Col, Row } from "react-bootstrap";

export const CardHeader = styled(CardBS.Header)`
  border-radius: 16px 16px 0px 0px;
  background: #aecd46;
  color: white;
`;
export const CardPrice = styled(CardBS.Title)`
    text-align: end;
`;

export const CardButtomContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 0.2rem;

    /* Faz com que todos os filhos diretos (botões) cresçam para preencher o espaço */
    & > * {
        flex: 1;
    }
`;


export const CardImg = styled(CardBS.Img)`
    max-width: 100%;
    max-height: 100%;
    width: auto;  
    height: auto;
`;