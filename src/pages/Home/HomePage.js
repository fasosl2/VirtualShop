import { useAppContext } from "../../storage/AppContext";
import { useEffect } from "react";
import { fetchChartsAction, fetchProductsAction } from "../../storage/actions";
import { Navbar } from "react-bootstrap";


export const HomePage = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    fetchChartsAction(dispatch);
  }, [dispatch]);
  
/*   const handlePlusButtonClick = (productId) => {
    dispatch(openModalCreateProductAction())
} */

  useEffect(() => {

  }, []);

  return (
    <>
  <section className="apresentacao">
    <h2 className="apresentacao__titulo">Cozinha Solidária</h2>
    <h3 className="apresentacao__subtitulo">Sérgio Pereira</h3>
    <p className="apresentacao__texto">
      A Cozinha Solidária Sérgio Pereira é um projeto social desenvolvido pela
      ONG GTP+ em Recife, que fornece refeições nutritivas para pessoas em
      situação de rua na cidade. O projeto é mantido através do serviço de
      buffet corporativo oferecido pela ONG para empresas, cujo valor arrecadado
      é revertido para a compra de ingredientes para as refeições.
    </p>
    <p className="apresentacao__texto2">
      O propósito maior da ONG GTP+ é atender pessoas que vivem e convivem com
      HIV, promovendo a inclusão social e a dignidade humana para aqueles que
      são frequentemente marginalizados pela sociedade. Ao adquirir o serviço de
      buffet corporativo, as empresas contribuem para a continuidade do projeto
      Cozinha Solidária Sérgio Pereira e ajudam a promover um futuro mais justo
      e solidário para a comunidade de Recife.
    </p>
  </section>
  <section className="clientes">
    <h2 className="clientes__titulo">Clientes+</h2>
    {/* Slider main container */}
    <div className="swiper">
      {/* Additional required wrapper */}
      <div className="swiper-wrapper">
        {/* Slides */}
        <div className="swiper-slide">
          <img
            src="imgs/UFPE.svg"
            alt="logo da Universidade Federal de Pernambuco"
          />
        </div>
        <div className="swiper-slide">
          <img src="imgs/METROPOLE.svg" alt="logo da metropole" />
        </div>
        <div className="swiper-slide">
          <img src="imgs/REC.svg" alt="logo da prefeitura do Recife" />
        </div>
        <div className="swiper-slide">
          <img
            src="imgs/CATOLICA.svg"
            alt="logo da Universidade católica de Pernambuco"
          />
        </div>
        ...
      </div>
      {/* If we need pagination */}
      <div className="swiper-pagination" />
      {/* If we need navigation buttons */}
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </div>
  </section>
  <section className="catalogo">
    <h2 className="catalogo__titulo">Catálogo</h2>
    <div className="catalogo__conteudo">
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
    </div>
  </section>
  <Navbar bg="light" expand="lg">
  <footer className="rodape">
    <a href="/">
      <img
        src="imgs/instagram.svg"
        alt="logo do instagram"
        className="logoinsta"
      />
    </a>
    <a href="/">
      <img
        src="imgs/facebook.svg"
        alt="logo do facebook"
        className="logoface"
      />
    </a>
    <h2 className="logo_footer">Cozinha Solidária</h2>
    <h3 className="logo2_footer">Sérgio Pereira</h3>
    <p className="texto_footer">
      E-mail: gtp@gtp.org.br <br/>
      Telefone: +55 81 3231.0905 <br/>
      Endereço: Av. Manoel Borba, nº 545, 1º andar, Boa Vista, Recife, <br />{" "}
      Pernambuco, Brasil. CEP: 50070-000
    </p>
  </footer>
  </Navbar>
</>

  );
};
