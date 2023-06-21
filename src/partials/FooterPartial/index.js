import React from "react";
import { Footer, FooterCol, FooterLink, FooterText, Heading, SubHeading } from "./styles";
import { Container, Row, Col } from "react-bootstrap";
import roundedLogo from "../../assets/rounded-logo.svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";

export const FooterPartial = () => {
  return (
    <Footer>
      <Container>
        <Row>
          <Col sm={10} md={6}>
            <Row>
              <Col md={2}>
                <img
                  src={roundedLogo}
                  alt="footer logo"
                  style={{ width: "60px", height: "60px" }}
                />
              </Col>
              <Col>
                <Row>
                  <Heading>Cozinha+</Heading>
                  <SubHeading>Cozinha Solidária Sérgio Pereira</SubHeading>
                </Row>
                <Row>
                  <FooterCol md={1}>
                    <img
                      src={instagram}
                      alt="footer logo"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </FooterCol>
                  <FooterCol md={1}>
                    <img
                      src={facebook}
                      alt="footer logo"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </FooterCol>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm={10} md={6}>
            <FooterText>
              E-mail:{" "}
              <FooterLink href="mailto:gtp@gtp.org.br">
                gtp@gtp.org.br
              </FooterLink>
              <br />
              Telefone:{" "}
              <FooterLink href="tel:+558132310905">
                {" "}
                +55 81 3231.0905{" "}
              </FooterLink>
              <br />
              Endereço:{" "}
              <FooterLink href="https://www.google.com/maps?q=Av. Manoel Borba, nº 545, 1º andar, Boa Vista, Recife,Pernambuco, Brasil. CEP: 50070-000">
                {" "}
                Av. Manoel Borba, nº 545, 1º andar, Boa Vista, Recife, <br />{" "}
                Pernambuco, Brasil. CEP: 50070-000
              </FooterLink>
            </FooterText>
          </Col>
        </Row>
      </Container>
    </Footer>
  );
};
