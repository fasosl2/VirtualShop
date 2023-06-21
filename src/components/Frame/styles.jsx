import styled from "styled-components";
import {Card as BSCard} from 'react-bootstrap/';

export const Card = styled(BSCard)`
aspect-ratio: ${(props) => (props.aspect ? props.aspect : '5 / 4')};
    border-radius: 30px;
    ${(props) => props.image ? `background-image: url(${props.image});
    background-position: center;
    background-size: cover;
    background-blend-mode: screen;` : ""};
    transition: position 2s ease-out;
`;