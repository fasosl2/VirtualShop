import styled from "styled-components";
import { Container as BSContainer, Form as FormBS } from "react-bootstrap";
import { Button as ButtonBS } from "../../components/Button";

export const Button = styled(ButtonBS)`
    width: 100%;
`

export const Hr = styled.hr`
    border-top: solid 1px #008ECC;
`

export const Container = styled(BSContainer)`
width: 95vw;
color: #475C6D;
@media screen and (min-width: 750px) {     
    width: 23vw;
}
`;

export const Form = styled(FormBS)`
    font-size: 0.9rem ;
    padding: 4% 0;
`

export const FormControl = styled(FormBS.Control)`
    font-size: 0.9rem ;
    margin-bottom: 4%;
`

export const H6 = styled.h6`   
    border-bottom: solid 1px #008ECC;
    padding: 7% 0 4% 0;
    margin: 0;
`

export const LoginImage = styled.img`
width: 50px;
// @media screen and (min-width: 750px) {     
//     width: 20vw;
// }
`;