import styled from "styled-components";
import { Card } from "react-bootstrap";

export const CardHeader = styled(Card.Header)`
  border-radius: 16px 16px 0px 0px;
  background: #aecd46;
  color: white;
`;
export const CardPrice = styled(Card.Title)`
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


export const CardImg = styled(Card.Img)`
    max-width: 100%;
    max-height: 100%;
    width: auto;  
    height: auto;
`;