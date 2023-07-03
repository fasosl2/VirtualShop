import styled from "styled-components";
import { Button } from 'react-bootstrap';
export const ButtonBS = styled(Button)`
    background-color:${(props) => props?.variant === 'primary' ? '#475C6D' : 
    (props?.variant === 'danger' ? '#D61B26' :'#D6DADE')};
    color:${(props) => props?.variant === 'primary' ? '#FFF' : 
    (props?.variant === 'danger' ? '#FFF' :'#475C6D')};
    min-height: 40px;
    box-shadow: 0px 0px 4px rgba(71, 92, 109, 0.075);
    border: none;
    border-radius: 16px;
    padding: 0px 1em;
    ${(props)=> props?.$width && `width:${props?.$width};`}
`;