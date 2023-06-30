import React from "react";
import { Footer, FooterLink, Heading } from "./styles";
import { Container, Row, Col } from "react-bootstrap";
import roundedLogo from "../../assets/rounded-logo.svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";

export const FooterPartial = () => {
  return (
    <Footer>
      <Container>
        <Row>
          <Col>
            <Row>
              <Col md={2}>
                <img src={roundedLogo} alt="footer logo" style={{width:'60px',height:'60px'}}/>
              </Col>
              <Col>
                <Heading>Cozinha+</Heading>
                <p>Cozinha Solidária Sérgio Pereira</p>
            <Row>
              <Col md={1}>
                <img src={instagram} alt="footer logo" style={{width:'30px',height:'30px'}}/>
              </Col>
              <Col md={1}>
                <img src={facebook} alt="footer logo" style={{width:'30px',height:'30px'}}/>
              </Col>
            </Row>
              </Col>
            </Row>
          </Col>
          <Col>
          <p>
            E-mail: <FooterLink href="mailto:gtp@gtp.org.br">gtp@gtp.org.br</FooterLink>
            <br />
            Telefone: +55 81 3231.0905 
            <br />
            Endereço: Av. Manoel Borba, nº 545, 1º andar, Boa Vista, Recife,{" "}
            <br /> Pernambuco, Brasil. CEP: 50070-000
          </p>
          </Col>
        </Row>
      </Container>
    </Footer>
  );
};
