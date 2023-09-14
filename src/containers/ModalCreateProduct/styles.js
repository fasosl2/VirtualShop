import styled from "styled-components";
import { Row as RowBS, Col as ColBS } from "react-bootstrap";

export const Row = styled(RowBS)`
    // margin: 0 2px;
    padding: 0 5px;
`
    
export const Col = styled(ColBS)`
`

export const Input = styled.input`
    display: none;

    input:checked ~ .checkmark:after {
        display: block;
    }
`