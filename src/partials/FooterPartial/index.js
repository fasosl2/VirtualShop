import React from "react";
import { Footer, FooterLink, FooterText, Heading, SubHeading } from "./styles";
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
                <SubHeading>Cozinha Solidária Sérgio Pereira</SubHeading>
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
          <FooterText>
            E-mail: <FooterLink href="mailto:gtp@gtp.org.br">gtp@gtp.org.br</FooterLink>
            <br />
            Telefone: <FooterLink href="tel:+558132310905"> +55 81 3231.0905 </FooterLink>
            <br />
            Endereço: <FooterLink href="https://www.google.com/maps?q=Av. Manoel Borba, nº 545, 1º andar, Boa Vista, Recife,Pernambuco, Brasil. CEP: 50070-000"> Av. Manoel Borba, nº 545, 1º andar, Boa Vista, Recife,{" "}
            <br /> Pernambuco, Brasil. CEP: 50070-000</FooterLink>
          </FooterText>
          </Col>
        </Row>
      </Container>
    </Footer>
  );
};
