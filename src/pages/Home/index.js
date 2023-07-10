import { useAppContext } from "../../storage/AppContext";
import { useEffect } from "react";
import { fetchChartsAction } from "../../actions/chartActions";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../components/Button";
import feedTheChangeBanner from "../../assets/feed-the-change.png";
import {
  BannerImage,
  ContentSection,
  HomeSwiperContainer,
  SlideContainer,
  SlideContainerLogo,
  H2,
  H4,
} from "./styles";
import { Frame } from "../../components/Frame";
import { SwiperContainer, SwiperSlide } from "../../components/Swiper";
import image1 from "../../assets/home-img1.png";
import ufpeLogo from "../../assets/client-ufpe-logo.png";
import metropoleLogo from "../../assets/client-metropole-logo.png";
import prefeituraRecifeLogo from "../../assets/client-prefeitura-recife-logo.png";
import unicapLogo from "../../assets/client-unicap-logo.png";
import { SwiperImage } from "../../components/Swiper/styles";
import { useNavigate } from "react-router-dom";

// ...
import { Card } from "../../components/Card";
import comida01 from "../../assets/homeCarrossel/comida01.png";
import comida02 from "../../assets/homeCarrossel/comida02.png";
import comida03 from "../../assets/homeCarrossel/comida03.png";

// ...

export const HomePage = () => {
  const swiperArray = [
    {
      img: comida01,
      title: "Experiência+",
      text: " Desfrute de uma experiência gastronômica única com nossas marmitas com finger food. A cada compra de uma Experiência+, você estará contribuindo para uma ação solidária, pois doaremos uma marmita para uma pessoa em situação de vulnerabilidade. Além de saborear pratos deliciosos, você estará fazendo a diferença na vida de quem mais precisa.",
    },
    {
      img: comida02,
      title: "CoffeeBreak+",
      text: "Transforme seus eventos corporativos em momentos especiais com nosso serviço de Coffee Break. Proporcionamos uma pausa revigorante, oferecendo uma seleção de bebidas quentes e frias, acompanhadas por opções deliciosas de petiscos e doces.O seu evento será marcado por sabores incríveis e um atendimento excepcional.",
    },
    {
      img: comida03,
      title: "Buffet+",
      text: "Tenha uma experiência gastronômica diferenciada com nosso serviço de Buffet+. Nossas refeições são preparadas com ingredientes frescos e selecionados, oferecendo uma variedade de pratos saborosos e balanceados. Seja para um almoço individual ou para um evento corporativo, buscamos proporcionar momentos de prazer e alimentação de qualidade.",
    },
  ];

  const { dispatch } = useAppContext();
  useEffect(() => {
    fetchChartsAction(dispatch);
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
      <ContentSection>
        <Row>
          <Col md={5}>
            <Frame image={image1}></Frame>
          </Col>
          <Col>
            <H4>Cozinha+</H4>
            <h6>
              <i> Cozinha Solidária Sérgio Pereira </i>
            </h6>{" "}
            <br />
            <p>
              A Cozinha Solidária Sérgio Pereira é um projeto social
              desenvolvido pela ONG GTP+ em Recife, que fornece refeições
              nutritivas para pessoas em situação de rua na cidade. O projeto é
              mantido através do serviço de buffet corporativo oferecido pela
              ONG para empresas, cujo valor arrecadado é revertido para a compra
              de ingredientes para as refeições.
            </p>
            <p>
              O propósito maior da ONG GTP+ é atender pessoas que vivem e
              convivem com HIV, promovendo a inclusão social e a dignidade
              humana para aqueles que são frequentemente marginalizados pela
              sociedade. Ao adquirir o serviço de buffet corporativo, as
              empresas contribuem para a continuidade do projeto Cozinha
              Solidária Sérgio Pereira e ajudam a promover um futuro mais justo
              e solidário para a comunidade de Recife.
            </p>
          </Col>
        </Row>
      </ContentSection>
      <ContentSection>
        {
          <HomeSwiperContainer>
            <H2>Clientes+</H2>
            <SlideContainerLogo>
              <SwiperContainer>
                <SwiperSlide>
                  <SwiperImage
                    src={ufpeLogo}
                    alt={"Universidade Federal de Pernambuco"}
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <SwiperImage src={metropoleLogo} alt={"Metrópole"} />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperImage
                    src={prefeituraRecifeLogo}
                    alt={"Prefeitura do Recife"}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperImage
                    src={unicapLogo}
                    alt={"Universidade Católica de Pernambuco"}
                  />
                </SwiperSlide>
              </SwiperContainer>
            </SlideContainerLogo>
          </HomeSwiperContainer>
        }
        {/* Slider main container */}
      </ContentSection>
      <ContentSection>
        {
          <HomeSwiperContainer>
            <H2>Catálogo+ </H2>
            <SwiperContainer slidesPerView={[3, 1]}>
              {swiperArray.map((item, index) => (
                <SwiperSlide key={index}>
                  <SlideContainer>
                    <Card
                      image={item.img}
                      title={item.title}
                      style={{ height: "100%", borderRadius: "16px" }}
                      styleFooter={{ borderTop: "none", background: "none" }}
                      styleBody={{ overflowY: "auto" }}
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
      </ContentSection>
    </>
  );
};
