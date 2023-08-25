import { useAppContext } from "../../storage/AppContext";
import { useEffect } from "react";
// import { fetchChartsAction } from "../../actions/chartActions";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../components/Button";
import feedTheChangeBanner from "../../assets/feed-the-change.png";
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
import comida04 from "../../assets/homeCarrossel/comida04.png";
import comida05 from "../../assets/homeCarrossel/comida05.png";
import comida06 from "../../assets/homeCarrossel/comida06.png";
import comida07 from "../../assets/homeCarrossel/comida07.png";
import { authUsersAction } from "../../actions/userActions";

// ...

export const HomePage = () => {
  const swiperArray = [
    {
      img: logo00,
      title: "catálogo+",
      text: "Explore nossa variedade de serviços de buffet de alta qualidade para eventos corporativos e ocasiões especiais.",
    },
    {
      img: comida01,
      title: "Experiência+",
      text: "R$28,00-R$33,00/pessoa 20 a 70 pessoas",
    },
    {
      img: comida07,
      title: "refeição+",
      text: "R$19,00-R$24,00/pessoa 20 a 70 pessoas",
    },
    {
      img: comida04,
      title: "coffeeBreak++",
      text: "R$34,00-R$39,00/pessoa 20 a 30 pessoas",
    },
    {
      img: comida05,
      title: "almoço+",
      text: "R$40,00-R$45,00/pessoa 20 a 30 pessoas",
    },
    {
      img: comida06,
      title: "jantar+",
      text: "R$34,00-R$39,00/pessoa 20 a 30 pessoas",
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
        <h2 style={{ color: "white", fontWeight: "700" }}>
          alimente a mudança
        </h2>
        <Button
          {...{
            label: "contrate",
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
                    index= {index}
                    image={item.img}
                    title={item.title}
                    style={{
                      display: "flex",
                      alignItems: "normal",
                      flexDirection: "row",
                      fontSize: "0.7rem",
                      margin: "16px 12px",
                      border: "none",
                      height: "120px"
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
                    navigate("/produtos");
                  },
                }}
              />
            </BannerImage>
          </Col>
        </Row>
      </Container>

      <ContentSection>
        <Row>
          <Col xs={12} md={6} >
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
            <Container style={{ paddingTop: "0px"}}>
              <H4>Cozinha+</H4>
              <h6>
                <i> Cozinha Solidária Sérgio Pereira </i>
              </h6>{" "}
              <br />
              <p>
                A Cozinha Solidária Sérgio Pereira é um projeto social
                desenvolvido pela ONG GTP+ em Recife, que fornece refeições
                nutritivas para pessoas em situação de rua na cidade. O projeto
                é mantido através do serviço de buffet corporativo oferecido
                pela ONG para empresas, cujo valor arrecadado é revertido para a
                compra de ingredientes para as refeições.
              </p>
              <p>
                O propósito maior da ONG GTP+ é atender pessoas que vivem e
                convivem com HIV, promovendo a inclusão social e a dignidade
                humana para aqueles que são frequentemente marginalizados pela
                sociedade. Ao adquirir o serviço de buffet corporativo, as
                empresas contribuem para a continuidade do projeto Cozinha
                Solidária Sérgio Pereira e ajudam a promover um futuro mais
                justo e solidário para a comunidade de Recife.
              </p>
            </Container>
          </Col>
        </Row>
      </ContentSection>

      <ContentSection>
        {
          <HomeSwiperContainer>
            <H4 footer>Clientes+</H4>
            <SlideContainerLogo>
              <SwiperContainer>
                <SwiperSlide>
                  <SwiperImage
                    src={ufpeLogo}
                    alt={"Universidade Federal de Pernambuco"}
                    />
                    <p>Universidade Federal de Pernambuco</p>
                </SwiperSlide>
                
                <SwiperSlide>
                  <SwiperImage
                    src={oi}
                    alt={"Oi Telefonia"}
                    />
                    <p>Oi telefonia</p>
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperImage
                    src={unicapLogo}
                    alt={"Universidade Católica de Pernambuco"}
                  />
                    <p>Universidade Católica de Pernambuco</p>
                </SwiperSlide>
             
                <SwiperSlide>
                  <SwiperImage
                    src={prefeituraRecifeLogo}
                    alt={"Prefeitura do Recife"}
                  />
                  <p>Prefeitura de Recife</p>
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperImage src={metropoleLogo} alt={"Metrópole"} />
                    <p>Clube Metrópole</p>
                </SwiperSlide>
              </SwiperContainer>
            </SlideContainerLogo>
          </HomeSwiperContainer>
        }
        {/* Slider main container */}
      </ContentSection>
    </>
  );
};
