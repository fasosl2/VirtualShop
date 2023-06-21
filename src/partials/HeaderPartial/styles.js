import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Link = styled(RouterLink).attrs({
    className: 'nav-link',
    })`
    ${(props) => props.currentpath === props.to && 
        `color: #D61B26;
        font-weight: 600;`
    }
    &:hover {
        font-weight: 700;
        color: #D01100;
    }
    &:focus {
        color: #D01100;
    }
`;