import styled from "styled-components";

export const BannerImage = styled.div`

    background: linear-gradient(0deg, #D61B26, #D61B26), url(${(props) => props.image ? props.image : '.jpg'}), #D9D9D9;
    background-blend-mode: multiply, normal, normal;
    height: 500px;
    background-position: center;
    background-size: cover;

    @media screen and (min-width: 750px) {  

    }
`;

export const ContentSection = styled.div`

    padding: 20px 10px;

    @media screen and (min-width: 750px) {  
        padding: 20px 10%;
    }
`;