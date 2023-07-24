import styled from "styled-components";
import { Container as BSContainer } from "react-bootstrap";

export const Container = styled(BSContainer)`
width: 95vw;
@media screen and (min-width: 750px) {     
    width: 20vw;
}
`;

export const LoginImage = styled.img`
width: 50px;
// @media screen and (min-width: 750px) {     
//     width: 20vw;
// }
`;