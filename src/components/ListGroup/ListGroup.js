import { useState } from "react";
import {
  Dropdown,
  // ButtonGroup,
  ListGroup as ListGroupBS,
  Spinner,
} from "react-bootstrap";
import {
  ContentSection,
  Container,
  Title5,
  Col,
  Row,
  Button,
  Image,
  RowTitle,
  RowBody,
  RowFooter,
  ColListGroup,
  ButtonLink,
} from "./styles";
import lixeira from "../../assets/lixeira.svg";
import bag from "../../assets/bag.svg";
import { CountButtonGroup } from "../CountButtonGroup";
import { Link, useLocation } from "react-router-dom";

export const ListGroup = ({ items = [], ...props }) => {
  let total = 0;
  const location = useLocation();

  const [itemsLoading, setItemsLoading] = useState({});

  const handleClick = async (field, element, total, onClick) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    await onClick({ element, negativeValue: total, setItemsLoading, field });
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  return props?.test ? (
    <>
      <Row>
        <RowTitle>
          <Title5>ítens no carrinho</Title5>
        </RowTitle>

        <RowBody>
          <ListGroupBS className="p-0">
            {items.map((item) => (
              <ListGroupBS.Item
                key={item.id}
                style={{ borderRadius: "0" }}
                className="border-0 border-bottom"
              >
                <noscript>{(total += item.value * item.total)}</noscript>
                <Row>
                  {/* imagem do produto */}
                  <Col
                    xs={6}
                    md={6}
                    className="d-flex justify-content-center align-items-start"
                  >
                    <ButtonLink
                      onClick={() =>
                        handleClick(
                          item.id + "excluir",
                          item,
                          item.total,
                          item.onClick
                        )
                      }
                    >
                      X
                    </ButtonLink>
                    <Image src={item.image} />
                  </Col>

                  {/* nome e valor */}
                  <Col xs={6} md={6} >
                    <Row>
                      <Col className="pl-3 fw-semibold">{item.title}</Col>
                    </Row>
                    {" $ " +
                      String(
                        (Number(item.value) * Number(item.total)).toFixed(2)
                      ) +
                      " "}
                  </Col>
                </Row>
              </ListGroupBS.Item>
            ))}
          </ListGroupBS>
        </RowBody>
      </Row>
      <Row>
        <Dropdown.Item>
          <Container className="p-0">
            <Link
              style={{
                backgroundColor: "rgba(71, 91, 109)",
                fontSize: "0.8rem",
                minHeight: "100%",
                width: "100%",
              }}
              className="border-0 rounded-3 btn btn-primary btn-lg active"
              role="button"
              currentpath={location.pathname}
              to="/chart"
            >
              Finalizar compra
            </Link>
          </Container>
        </Dropdown.Item>
      </Row>
    </>
  ) : (
    <Row>
      <Col md={9}>
        <ContentSection>
          <RowTitle>
            <Title5>Produtos</Title5>
          </RowTitle>

          <RowBody>
            <ListGroupBS className="p-0">
              {items.map((item) => (
                <ListGroupBS.Item
                  key={item.id}
                  style={{ borderRadius: "0" }}
                  className="border-0 border-bottom"
                >
                  <noscript>{(total += item.value * item.total)}</noscript>

                  <Row className="g-4 d-flex justify-content-center align-items-center">
                    {/* imagem do produto */}
                    <ColListGroup xs={4} md={2}>
                      <Image src={item.image} thumbnail />
                    </ColListGroup>

                    {/* nome e botão de excluir */}
                    <Col xs={8} md={4}>
                      <Row>
                        <Col className="pl-3">{item.title}</Col>
                      </Row>
                      <Row>
                        <Col style={{ paddingLeft: "0" }}>
                          <ButtonLink
                            onClick={() =>
                              handleClick(
                                item.id + "excluir",
                                item,
                                item.total,
                                item.onClick
                              )
                            }
                          >
                            {item.total ? "Exclui" : ""}
                            {itemsLoading[item.id + "excluir"]
                              ? "ndo"
                              : "r"}{" "}
                            {itemsLoading[item.id + "excluir"] && (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </Spinner>
                              </>
                            )}
                            <Image src={lixeira} />
                          </ButtonLink>
                        </Col>
                      </Row>
                    </Col>

                    {/* botões de quantidade  do produto */}
                    <ColListGroup xs={6} md={3}>
                      <CountButtonGroup
                        {...{
                          total: item.total,
                          onClick: item.onClick,
                          element: item,
                          contentlabel: "Compra",
                        }}
                      />
                    </ColListGroup>

                    {/* valor x quantidade */}
                    <ColListGroup xs={6} md={3}>
                      {" $ " +
                        String(
                          (Number(item.value) * Number(item.total)).toFixed(2)
                        ) +
                        " "}
                    </ColListGroup>
                  </Row>
                </ListGroupBS.Item>
              ))}
            </ListGroupBS>
          </RowBody>

          <RowFooter>
            <span>
              <ButtonLink>Adicione mais produtos!</ButtonLink>
            </span>
          </RowFooter>
        </ContentSection>
      </Col>
      <Col md={3}>
        <ContentSection className="sticky-top" style={{ zIndex: "0" }}>
          <Row className="border-bottom pt-3 pb-3 pl-2 m-0 ">
            <span>
              <Title5>
                <Image src={bag} className="m-1 mt-0" />
                Resumo de Compras
              </Title5>
            </span>
          </Row>
          <Row className="p-3">
            <Row className="p-0 m-0">
              <Col>Produtos</Col>
            </Row>
            <Row className="p-0 m-0">
              <Col className="col-8">Total: $ </Col>
              <Col className="col-4">{Number(total).toFixed(2)}</Col>
            </Row>
          </Row>

          <Row>
            <Container>
              <Button
                className="border-0 m-3"
                style={{
                  backgroundColor: "rgba(71, 91, 109)",
                  fontSize: "0.7rem",
                  minHeight: "40px",
                  width: "100%",
                }}
              >
                Continuar a compra
              </Button>
            </Container>
          </Row>
        </ContentSection>
      </Col>
    </Row>
  );
};
