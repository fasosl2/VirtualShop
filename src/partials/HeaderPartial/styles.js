import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Container } from "react-bootstrap";

export const Link = styled(RouterLink).attrs({
    className: 'nav-link',
    })`
    ${(props) => props.currentpath === props.to && 
        `color:rgb(100, 185, 20);
        font-weight: 600;`
    }
    margin: 0px 0.5em;
    &:hover {
        font-weight: 700;
        color: rgb(100, 185, 20);
    }
    &:focus {
        color: rgb(100, 185, 20);
    }
`;

export const HomeContainer = styled(Container)`
@media screen and (min-width: 768px){
    margin: 0px 15%; 
}    
`;
export const NavbarBrand = styled.img`
    max-height: 50px;
`;