import { Col } from "react-bootstrap";
import styled from "styled-components";

export const ContentSection = styled.div`

    padding: 20px 10px;

    @media screen and (min-width: 750px) {  
        padding: 20px 10%;
    }
`;
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
        padding: 0px 20%;
    }
`;
