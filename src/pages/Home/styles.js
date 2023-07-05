import { Col } from "react-bootstrap";
import styled from "styled-components";


export const ContentSection = styled.div`

    padding: 20px 10px;

    @media screen and (min-width: 750px) {  
        padding: 70px 10% 0 10%;
    }
`;

export const SlideContainer = styled.div`
    padding: 20px 20px 20% 20px;
`;

export const SlideContainerLogo = styled.div`
    width: 60%;
    padding: 20px 20px 0 20px;
`;

export const H2 =  styled.h2`
    font-weight: 700;
`
export const H4 =  styled.h4`
    font-weight: 600;
`

export const BannerImage = styled.div`
    background: linear-gradient(0deg, #D61B26, #D61B26), url(${(props) => props.image ? props.image : '.jpg'}), #D9D9D9;
    background-blend-mode: multiply, normal, normal;
    height: 300px;
    width: 100%;
    background-position: center;
    background-size: cover;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 750px) {  
        height: 500px;
    }
`;
export const HomeSwiperContainer = styled(Col)`
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 750px) {  
        padding: 0px 4%;
    }
`;
