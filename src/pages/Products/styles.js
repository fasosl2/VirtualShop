import { Col, Container } from 'react-bootstrap';
import styled from 'styled-components';

export const ProductContainer = styled(Container)`
@media screen and (min-width: 768px){
    margin: 1em 15%; 
}    
`;

export const ProductCol = styled(Col)`
    width: 100%;
@media screen and (min-width: 768px){
    width: 70%;
}    
`;