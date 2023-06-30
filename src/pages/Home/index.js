import { useAppContext } from "../../storage/AppContext";
import { useEffect } from "react";
import { fetchChartsAction } from "../../actions/chartActions";
import { Col, Navbar, Row } from "react-bootstrap";
import { Button } from "../../components/Button";
  import feedTheChangeBanner from "../../assets/feed-the-change.png";
import { BannerImage, ContentSection, HomeSwiperContainer } from "./styles";
import { Frame } from "../../components/Frame";
import { SwiperContainer, SwiperSlide } from "../../components/Swiper";
import image1 from "../../assets/home-img1.png";
import ufpeLogo from "../../assets/client-ufpe-logo.png";
import metropoleLogo from "../../assets/client-metropole-logo.png";
import prefeituraRecifeLogo from "../../assets/client-prefeitura-recife-logo.png";
import unicapLogo from "../../assets/client-unicap-logo.png";
import { SwiperImage } from "../../components/Swiper/styles";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
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
              <h2 style={{color :'white',fontWeight:'700'}}>alimente a mudança</h2>
              <Button
              {...{
                label: "contrate",
                variant: "secondary",
                onClick: async () => {
                  navigate('/produtos')}}}
              />
      </BannerImage>
      <ContentSection>
        <Row>
          <Col md={5}>
            <Frame image={image1}>
            </Frame>
          </Col>
          <Col>
            <h4>Cozinha+</h4>
            <h6>Cozinha Solidária Sérgio Pereira</h6>
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
            <h2>Clientes+</h2>
          <SwiperContainer>
            <SwiperSlide>
              <SwiperImage
                src={ufpeLogo}
                alt={"Universidade Federal de Pernambuco"}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SwiperImage
                src={metropoleLogo}
                alt={"Metrópole"}
              />
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
          </HomeSwiperContainer>
        }
        {/* Slider main container */}
      </ContentSection>
      <ContentSection>
        {
          <HomeSwiperContainer>
            <h2>Catálogo+</h2>
          <SwiperContainer>
            <SwiperSlide>  
          <div className="coffee_break">
            <img
              className="basico"
              src="imgs/basico.svg"
              alt="fotografia do coffee break básico"
            />
            <h2 className="titulo__basico">Coffee Break</h2>
            <h3 className="subtitulo__basico">Básico</h3>
            <p className="valor1">Valor por pessoa: R$xx,xx</p>
            <table className="tabela__basico">
              <tbody>
                <tr>
                  <td>Bolo simples</td>
                  <td>1 fatia</td>
                </tr>
                <tr>
                  <td>Minissanduíche</td>
                  <td>2 unidades</td>
                </tr>
                <tr>
                  <td>Minissalgado de forno</td>
                  <td>2 unidades</td>
                </tr>
                <tr>
                  <td>Suco</td>
                  <td>300ml</td>
                </tr>
                <tr>
                  <td>Café e água mineral (sem gás)</td>
                  <td />
                </tr>
              </tbody>
            </table>
            <button type="button" className="button2">
              Saiba +
            </button>
          </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="coffee_break2">
            <img
              className="padrao"
              src="imgs/padrao.svg"
              alt="fotografia do coffee break padrão"
            />
            <h2 className="titulo__padrao">Coffee Break</h2>
            <h3 className="subtitulo__padrao">Padrão</h3>
            <p className="valor2">Valor por pessoa: R$xx,xx</p>
            <table className="tabela__padrao">
              <tbody>
                <tr>
                  <td>Bolo simples</td>
                  <td>1 fatia</td>
                </tr>
                <tr>
                  <td>Minissanduíche</td>
                  <td>2 unidades</td>
                </tr>
                <tr>
                  <td>Minissalgado de forno</td>
                  <td>2 unidades</td>
                </tr>
                <tr>
                  <td>Minissalgado de frito</td>
                  <td>3 unidades</td>
                </tr>
                <tr>
                  <td>Docinho</td>
                  <td>2 unidades</td>
                </tr>
                <tr>
                  <td>Minibrioche</td>
                  <td>1 unidade</td>
                </tr>
                <tr>
                  <td>Suco</td>
                  <td>300ml</td>
                </tr>
                <tr>
                  <td>Café e água mineral (sem gás)</td>
                  <td />
                </tr>
              </tbody>
            </table>
            <button type="button" className="button__padrao">
              Saiba +
            </button>
          </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="coffee_break3">
            <img
              className="executivo"
              src="imgs/executivo.svg"
              alt="fotografia do coffee break executivo"
            />
            <h2 className="titulo__executivo">Coffee Break</h2>
            <h3 className="subtitulo__executivo">Executivo</h3>
            <p className="valor3">Valor por pessoa: R$xx,xx</p>
            <table className="tabela__executivo">
              <tbody>
                <tr>
                  <td>Bolo simples</td>
                  <td>1 fatia</td>
                </tr>
                <tr>
                  <td>Minissanduíche</td>
                  <td>2 unidades</td>
                </tr>
                <tr>
                  <td>Minissalgado de forno</td>
                  <td>2 unidades</td>
                </tr>
                <tr>
                  <td>Minissalgado de frito</td>
                  <td>3 unidades</td>
                </tr>
                <tr>
                  <td>Docinho</td>
                  <td>3 unidades</td>
                </tr>
                <tr>
                  <td>Minibrioche</td>
                  <td>1 unidade</td>
                </tr>
                <tr>
                  <td>Torradas e patê</td>
                  <td>1 porção</td>
                </tr>
                <tr>
                  <td>Salada de fruta</td>
                  <td>150ml</td>
                </tr>
                <tr>
                  <td>Suco</td>
                  <td>300ml</td>
                </tr>
                <tr>
                  <td>Refrigerante</td>
                  <td>150ml</td>
                </tr>
                <tr>
                  <td>Café e água mineral (sem gás)</td>
                  <td />
                </tr>
              </tbody>
            </table>
            <button type="button" className="button__executivo">
              Saiba +
            </button>
          </div>
            </SwiperSlide>
          </SwiperContainer>
          </HomeSwiperContainer>
        }
        {/* Slider main container */}
      </ContentSection>
    </>
  );
};
