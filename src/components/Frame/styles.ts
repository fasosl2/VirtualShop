import styled from "styled-components";
import {Card } from 'react-bootstrap/';

export const StyledCard = styled(Card)`
aspect-ratio: ${(props) => (props.aspect ? props.aspect : '5 / 4')};
    border-radius: 30px;

    ${(props) => props.radius ? `
    width: 180px;
    height: 180px;
    border-radius: 50%;

    @media screen and (min-width: 750px) {  
        width: 330px;
        height: 330px;
        border-radius: 50%;
    
    }
    ` : ""};

    ${(props) => props.image ? `background-image: url(${props.image});
    position: absolute;
    background-position: center;
    background-size: cover;
    background-blend-mode: screen;` : ""};
    transition: position 2s ease-out;
`;