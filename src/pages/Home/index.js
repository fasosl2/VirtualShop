import { useAppContext } from "../../storage/AppContext";
import { useEffect } from "react";
// import { fetchChartsAction } from "../../actions/chartActions";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../components/Button";
import feedTheChangeBanner from "../../assets/logo.jpg";
import collaborators from "../../assets/collaborators.png";
import {
  BannerImage,
  ContentSection,
  HomeSwiperContainer,
  SlideContainer,
  SlideContainerLogo,
  Container,
  H2,
  H4,
  Circle,
  BannerH2,
} from "./styles";
import { Frame } from "../../components/Frame";
import { SwiperContainer, SwiperSlide } from "../../components/Swiper";
import image1 from "../../assets/home-img1.png";
import ufpeLogo from "../../assets/client-ufpe-logo.png";
import oi from "../../assets/telenofia-oi.png";
import metropoleLogo from "../../assets/client-metropole-logo.png";
import prefeituraRecifeLogo from "../../assets/client-prefeitura-recife-logo.png";
import unicapLogo from "../../assets/client-unicap-logo.png";
import { SwiperImage } from "../../components/Swiper/styles";
import { useNavigate } from "react-router-dom";

// ...
import { Card } from "../../components/Card";
import logo00 from "../../assets/homeCarrossel/logo00.png";
import comida01 from "../../assets/homeCarrossel/comida01.png";
import comida02 from "../../assets/homeCarrossel/comida02.png";
import comida04 from "../../assets/homeCarrossel/comida04.png";
import comida05 from "../../assets/homeCarrossel/comida05.png";
import comida06 from "../../assets/homeCarrossel/comida06.png";
import comida07 from "../../assets/homeCarrossel/comida07.png";
import { authUsersAction } from "../../actions/userActions";

// ...

export const HomePage = () => {
  const swiperArray = [
    {
      img: comida01,
      title: "Ovos de Capoeira",
      text: "Ovos frescos de galinhas criadas soltas, com sabor autêntico e produção sustentável.",
    },
    {
      img: comida02,
      title: "Queijos Frescos",
      text: "Queijos artesanais produzidos com leite puro e técnicas tradicionais do campo.",
    },
    {
      img: comida07,
      title: "Cachaças",
      text: "Cachaças envelhecidas e artesanais, com aromas intensos e sabor marcante.",
    },
    {
      img: comida04,
      title: "Frutas Orgânicas",
      text: "Frutas cultivadas sem agrotóxicos, colhidas no ponto certo para máxima qualidade.",
    },
    {
      img: comida05,
      title: "Galinhas de Capoeira",
      text: "Criação livre e natural, oferecendo carne saborosa e nutritiva.",
    },
    {
      img: comida06,
      title: "Legumes Orgânicos",
      text: "Legumes frescos e saudáveis, cultivados com respeito à terra e ao meio ambiente.",
    },
  ];

  const { dispatch } = useAppContext();
  useEffect(() => {
    authUsersAction(dispatch);
  }, [dispatch]);

  /*   const handlePlusButtonClick = (productId) => {
    dispatch(openModalCreateProductAction())
} */

  const navigate = useNavigate();

  return (
    <>
      <BannerImage image={feedTheChangeBanner}>
        <BannerH2>Confira nossos Produtos</BannerH2>
        <Button
          {...{
            label: "Clique aqui",
            variant: "secondary",
            onClick: async () => {
              navigate("/produtos");
            },
          }}
        />
      </BannerImage>

      {/* <ContentSection>
        {
          <HomeSwiperContainer  style={{ display: "flex", flexDirection: "column"}}>
            <H2>Catálogo+ </H2>
            <SwiperContainer slidesPerView={[1, 3]}>
              {swiperArray.map((item, index) => (
                <SwiperSlide key={index}>
                  <SlideContainer key={index}>
                    <Card
                      image={item.img}
                      title={item.title}
                      style={{display: "flex", alignItems: "normal", flexDirection:"row", fontSize: "0.7rem"}}
                      styleFooter={{ borderTop: "none", background: "none" }}
                      styleBody={{ overflowY: "auto"}}
                      controls={[
                        {
                          label: "saiba+",
                          freeShow: true,
                          loadingLabel: "saiba+",
                          variant: "primary",
                          onClick: () => {},
                        },
                      ]}
                    >
                      {" "}
                      <br />
                      <p>{item.text}</p>
                    </Card>
                  </SlideContainer>
                </SwiperSlide>
              ))}
            </SwiperContainer>
          </HomeSwiperContainer>
        }
      </ContentSection> */}

      <ContentSection>
        {
          <Container>
            <Row>
              {swiperArray.map((item, index) => (
                <Col key={index} xs={12} md={6}>
                  <Card
                    index={index}
                    image={item.img}
                    title={item.title}
                    style={{
                      display: "flex",
                      alignItems: "normal",
                      flexDirection: "row",
                      fontSize: "0.7rem",
                      margin: "16px 12px",
                      border: "none",
                      height: "120px",
                    }}
                    styleFooter={{ borderTop: "none", background: "none" }}
                    styleBody={{ paddingTop: "0" }}
                    controls={[
                      {
                        label: "saiba+",
                        freeShow: true,
                        loadingLabel: "saiba+",
                        variant: "primary",
                        onClick: () => {},
                      },
                    ]}
                  >
                    <p>{item.text}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        }
      </ContentSection>

      <Container>
        <Row className="">
          <Col className="p-0" md={6}>
            <BannerImage image={collaborators} compact></BannerImage>
          </Col>
          <Col className="p-0" md={6}>
            <BannerImage compact style={{ background: "#475C6D" }}>
              <H2 white>
                quer um orçamento <br /> personalizado?
              </H2>
              <Button
                {...{
                  label: "fale com a gente no whatsapp",
                  variant: "secondary",
                  onClick: async () => {
                    window.open('https://wa.me/558181083818', '_blank');
                  },
                }}
              />
            </BannerImage>
          </Col>
        </Row>
      </Container>

      <ContentSection>
        <Row>
          <Col xs={12} md={6}>
            <Container>
              <Circle
                style={{
                  borderColor: "#FAB72D",
                  marginTop: "3%",
                }}
              ></Circle>
              <Circle></Circle>
              <Circle
                style={{
                  borderColor: "#D61B26",
                  marginTop: "0%",
                  marginLeft: "5%",
                }}
              ></Circle>
              <Frame image={image1} radius></Frame>
            </Container>
          </Col>
          <Col xs={12} md={6}>
            <Container style={{ paddingTop: "0px" }}>
              <H4>Chácara Japiá</H4>
              <h6>
                <i>Alimentos Saudáveis - Sem Conservantes</i>
              </h6>{" "}
              <br />
              <p>
                A Chácara Japiá é um refúgio de cultivo natural
                localizado em Recife, dedicado à produção de alimentos
                saudáveis, éticos e sustentáveis. Aqui, cada ovo 🥚 é 100%
                natural, vindo de 🐓 galinhas criadas livres, que se alimentam
                de forma verde e diversificada — com acesso a insetos, frutas e
                vegetais 🌽🥑🪱🦗🐜.
              </p>
              <p>
                Nosso compromisso é com a vida: 🚫 livre de hormônios e
                antibióticos 💊, respeitando o tempo da natureza e o bem-estar
                dos animais. A Chácara Japiá acredita que comida de verdade
                começa com respeito à terra, aos ciclos naturais e às
                comunidades que dela dependem.
              </p>
              <p>
                Mais do que uma produção, somos um projeto de transformação —
                cultivando alimentos que nutrem o corpo e valores que alimentam
                o futuro.
              </p>
            </Container>
          </Col>
        </Row>
      </ContentSection>

      <ContentSection>
        {
          // <HomeSwiperContainer>
          //   <H4 footer>Clientes+</H4>
          //   <SlideContainerLogo>
          //     <SwiperContainer>
          //       <SwiperSlide>
          //         <SwiperImage
          //           src={ufpeLogo}
          //           alt={"Universidade Federal de Pernambuco"}
          //         />
          //         <p>Universidade Federal de Pernambuco</p>
          //       </SwiperSlide>

          //       <SwiperSlide>
          //         <SwiperImage src={oi} alt={"Oi Telefonia"} />
          //         <p>Oi telefonia</p>
          //       </SwiperSlide>
          //       <SwiperSlide>
          //         <SwiperImage
          //           src={unicapLogo}
          //           alt={"Universidade Católica de Pernambuco"}
          //         />
          //         <p>Universidade Católica de Pernambuco</p>
          //       </SwiperSlide>

          //       <SwiperSlide>
          //         <SwiperImage
          //           src={prefeituraRecifeLogo}
          //           alt={"Prefeitura do Recife"}
          //         />
          //         <p>Prefeitura de Recife</p>
          //       </SwiperSlide>
          //       <SwiperSlide>
          //         <SwiperImage src={metropoleLogo} alt={"Metrópole"} />
          //         <p>Clube Metrópole</p>
          //       </SwiperSlide>
          //     </SwiperContainer>
          //   </SlideContainerLogo>
          // </HomeSwiperContainer>
        }
        {/* Slider main container */}
      </ContentSection>
    </>
  );
};
