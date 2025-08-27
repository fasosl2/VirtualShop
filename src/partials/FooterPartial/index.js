import React from "react";
import {
  Footer,
  FooterCol,
  FooterLink,
  FooterText,
  Heading,
  SubHeading,
} from "./styles";
import { Container, Row, Col } from "react-bootstrap";
import roundedLogo from "../../assets/logo.png";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import whatsapp from "../../assets/whatsapp.svg";

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
                  <Heading>Chácara Japiá</Heading>
                  <SubHeading>
                    Alimentos Saudáveis - Sem Conservantes
                  </SubHeading>
                </Row>
                <Row>
                  <FooterCol md={1}>
                    <a
                      href="https://www.instagram.com/chacarajapia/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={instagram}
                        alt="footer logo"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </a>
                  </FooterCol>
                  <FooterCol md={1}>
                    <a
                      href="https://wa.me/p/7324920890894671/558181083818"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={whatsapp}
                        alt="footer logo"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </a>
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
              {/* E-mail:{" "}
              <FooterLink href="mailto:gtp@gtp.org.br">
                gtp@gtp.org.br
              </FooterLink> */}
              <br />
              Telefone:{" "}
              <FooterLink href="tel:+5581981083818">
                {" "}
                +55 81 98108-3818{" "}
              </FooterLink>
              <br />
              {/* Endereço:{" "}
              <FooterLink href="https://www.google.com/maps?q=Av. Manoel Borba, nº 545, 1º andar, Boa Vista, Recife,Pernambuco, Brasil. CEP: 50070-000">
                {" "}
                Av. Manoel Borba, nº 545, 1º andar, Boa Vista, Recife, <br />{" "}
                Pernambuco, Brasil. CEP: 50070-000
              </FooterLink> */}
            </FooterText>
          </Col>
        </Row>
      </Container>
    </Footer>
  );
};
