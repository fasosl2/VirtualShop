import { Col } from "react-bootstrap";
import styled from "styled-components";


export const ContentSection = styled.div`

    padding: 20px 10px;

    @media screen and (min-width: 750px) {  
        padding: 40px 15% 20px 15%;
    }
`;

export const SlideContainer = styled.div`
    padding: 20px 20px 20px 0px;
    height: 100%;
`;

export const Circle = styled.div`
    width: 180px;
    height: 180px;
    border-radius: 400px;
    border: 14px solid var(--feedback-information-rosa-dark, #D961A0);
    position: absolute;
    margin-top: -30px;
    margin-left: 70px;  

    @media screen and (min-width: 750px) {  
        width: 330px;
        height: 330px;
        flex-shrink: 0;
        border-radius: 400px;
        border: 20px solid var(--feedback-information-rosa-dark, #D961A0);
        position: absolute;
        margin-top: -3%;
        margin-left: 8%; 
    }

`;

export const Container = styled.div`
    padding: 20px 20px 20px 0px;
    min-height: 250px;

    @media screen and (min-width: 750px) {  
        padding: 20px 20px 20px 0px;
        height: 100%;
        font-size: 0.8rem;
    }
`;

export const SlideContainerLogo = styled.div`
    width: 100%;
    padding: 20px 20px 0 20px;
    font-size: 0.8rem;
`;

export const H2 =  styled.h2`
    font-weight: 700;
    ${(props) => props.white ? `color: white;` : ''}
    
`
export const H4 =  styled.h4`
    font-weight: 700;
    margin-left: ${(props) => props.footer ? '2%' : ''};
`

export const BannerImage = styled.div`
${(props) =>
    props.compact
      ? `
      background: linear-gradient( 180deg, transparent 70% , rgb(71, 92, 109)  ),  url(${props.image});
      background-blend-mode: multiply, normal, normal;
      height: 200px;
      width: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% ;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  
      @media screen and (min-width: 750px) {  

        background: linear-gradient( 90deg, transparent 70% , rgb(71, 92, 109)  ),  url(${props.image});
        background-blend-mode: multiply, normal, normal;
        height: 300px;
        background-position: center;
        background-size: cover;
      }
  `
      : `
      background: linear-gradient(0deg, #D61B26, #D61B26), url(${ props.image}), #D9D9D9;
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
  
  `}

`;
export const HomeSwiperContainer = styled(Col)`
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;

    @media screen and (min-width: 750px) {  
        padding: 0px 2%;
    }
`;
