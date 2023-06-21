import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Container } from "react-bootstrap";

export const Link = styled(RouterLink).attrs({
    className: 'nav-link',
    })`
    ${(props) => props.currentpath === props.to && 
        `color: #D61B26;
        font-weight: 600;`
    }
    margin: 0px 0.5em;
    &:hover {
        font-weight: 700;
        color: #D01100;
    }
    &:focus {
        color: #D01100;
    }
`;

export const HomeContainer = styled(Container)`
@media screen and (min-width: 768px){
    margin: 0px 15%; 
}    
`;