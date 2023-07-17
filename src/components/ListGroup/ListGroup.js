import { useState } from "react";
import {
  ButtonGroup,
  ListGroup as ListGroupBS,
  Spinner,
} from "react-bootstrap";
import { ContentSection, Container, Title5, Col, Row, Button, Image } from "./styles";
import lixeira from "../../assets/lixeira.svg";
import bag from "../../assets/bag.svg";

export const ListGroup = ({ items = [] }) => {
  let total = 0;
  const [itemsLoading, setItemsLoading] = useState({});

  const handleClick = async (product, total, onClick) => {
    await onClick(product, total, setItemsLoading);
  };

  return (
    <>
      <Row>
        <Col md={9}>
          <ContentSection>
            <Row className="border-bottom  pt-3 pb-3 pl-2  m-0 ">
              <Title5>
                Produtos
              </Title5>
            </Row>

            <Row className="p-0 m-0">
              <ListGroupBS className="p-0" >
                {items.map((item) => (
                  <ListGroupBS.Item
                    key={item.id}
                    style={{ borderRadius: "0" }}
                    className="border-0 border-bottom"
                  >
                    <noscript>{(total += item.value * item.total)}</noscript>
                    <Row
                      className="g-4 d-flex justify-content-center align-items-center"
                    >
                      <Col
                        xs={8}
                        md={2}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Image src={item.image} thumbnail />
                      </Col>
                      <Col xs={8} md={4}>
                        <Row>
                          <Col className="pl-3">{item.title}</Col>
                        </Row>
                        <Row>
                          <Col style={{ paddingLeft: "0" }}>
                            <Button
                              style={{
                                textDecoration: "none",
                                textAlign: "left"}}
                              variant={"link"}
                              onClick={() =>
                                handleClick(item, item.total, item.onClick)
                              }
                            >
                              {item.total ? "Exclui" : ""}
                              {itemsLoading[item.id] ? "ndo" : "r"}{" "}
                              {itemsLoading[item.id] && (
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
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        xs={13}
                        md={3}
                        className=" d-flex justify-content-center align-items-center "
                      >
                        <ButtonGroup className="mb-2 border" >
                          {item.total ? (
                            <>
                              <Button
                                className="pt-0 pr-2 pb-0 pl-2 "
                                onClick={() =>
                                  handleClick(item, 1, item.onClick)
                                }
                                variant="light"
                              >
                                -
                              </Button>
                              <Button className="pt-0 pr-2 pb-0 pl-2" variant="light" disabled>
                                {item.total}
                              </Button>
                              <Button
                              className="pt-0 pr-2 pb-0 pl-2"
                                onClick={() =>
                                  handleClick(item, 0, item.onClick)
                                }
                                variant="light"
                              >
                                +
                              </Button>
                            </>
                          ) : (
                            ""
                          )}
                        </ButtonGroup>
                      </Col>
                      <Col
                        xs={12}
                        md={3}
                        className=" d-flex justify-content-center align-items-center "
                      >
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
            </Row>

            <Row
              className="pt-3 pb-3 pl-2 m-0"
              style={{ backgroundColor: "rgba(71, 91, 109, 0.1)" }}
            >
              <span >
                Adicione mais produtos!
                <Button variant="link" className="text-decoration-none" >
                Ver mais produtos do vendedor.
                </Button>
              </span>
            </Row>
          </ContentSection>
        </Col>
        <Col md={3}>
          <ContentSection className="sticky-top" style={{zIndex: "0"}}>
            <Row className="border-bottom pt-3 pb-3 pl-2 m-0 ">
              <span>
                <Title5>
                  <Image src={bag} className="m-1 mt-0" />
                  Resumo de Compras
                </Title5>
              </span>
            </Row>
            <Row className="p-3">
              <Row className="p-0 m-0" >
                <Col>Produtos</Col>
              </Row>
              <Row className="p-0 m-0" >
                <Col className="col-8">Total: $ </Col>
                <Col className="col-4">{Number(total).toFixed(2)}</Col>
              </Row>
            </Row>

            <Row >
              <Container >
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
    </>
  );
};
