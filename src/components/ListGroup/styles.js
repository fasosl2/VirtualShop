import styled from "styled-components";
import {
    Col as ColBS,
    Row as RowBS,
    Button as ButtonBS,
    Container as ContainerBS,
    Image as ImageBS
  } from "react-bootstrap";

export const Image = styled(ImageBS)`
    max-height: 70px;
`

export const Button = styled(ButtonBS)`
    font-size: 0.8rem;
`

export const Row = styled(RowBS)`
    color: #475C6D;
    font-size: 0.8rem;
    `
    export const Col = styled(ColBS)`
    color: #475C6D;
    font-size: 0.8rem;
`

export const ContentSection = styled.div`


    border: 1px solid rgba(71, 91, 109, 0.3);
    margin: 30px 0;
    border-radius: 8px;


`;

export const Container = styled(ContainerBS)`
    
    display:flex;
    justify-content: center;
`

export const Title5 = styled.h5`
    font-size: 0.8rem;
`