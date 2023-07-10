import { useState } from "react";
import {
  Badge,
  ButtonGroup,
  Col,
  ListGroup as ListGroupBS,
  Row,
  Spinner,
} from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "../Card";

export const ListGroup = ({ items = [] }) => {
  let total = 0;
  const [itemsLoading, setItemsLoading] = useState({});

  const handleClick = async (product, total, onClick) => {
    await onClick(product, total, setItemsLoading);
  };

  return (
    <>
      <Row style={{ width: "110%"}}>
        <Col md={8}>
          <Card
              title="Prodotos"
              style={{ borderRadius: "8px"}}
              classCard={"mt-4 mb-4"}
              classTitle={"d-flex justify-content-left align-items-center border-bottom p-3 fs-6"}
              classBody={"overflw-y-auto p-0"}
              styleFooter={{}}
            >
          <ListGroupBS >
            {items.map((item) => (
              <ListGroupBS.Item key={item.id} style={{ borderRadius: "0" }} className="border-top-0">
                <noscript>{(total += item.value * item.total)}</noscript>
                <Row className="g-4 d-flex justify-content-center align-items-center" style={{color: "#475C6D"}}>
                  <Col xs={8} md={2} className="d-flex justify-content-center align-items-center">
                    <img
                      src={item.image}
                      alt="vai"
                      className="w-50 h-25"
                    ></img>
                  </Col>
                  <Col xs={8} md={4}>
                    <Row>{item.title}</Row>
                    <Row>
                      <Col style={{ paddingLeft: "0" }}>
                        <Button
                          style={{ textDecoration: "none", textAlign: "left" }}
                          variant={"link"}
                          onClick={() =>
                            handleClick(item, item.total, item.onClick)
                          }
                        >
                          {item.total ? "Exclui" : "Compra"}
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
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={13}
                    md={3}
                    className=" d-flex justify-content-center align-items-center "
                  >
                    <ButtonGroup className="mb-2">
                      {item.total ? (
                        <>
                          <Button
                            onClick={() => handleClick(item, 1, item.onClick)}
                            variant="light"
                          >
                            -
                          </Button>
                          <Button variant="light">
                            <Badge bg="secondary">{item.total}</Badge>
                          </Button>
                          <Button
                            onClick={() => handleClick(item, 0, item.onClick)}
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
          </Card>
        </Col>
        <Col md={3}>
          <Card
              title="Resumo da compra"
              style={{ borderRadius: "8px", zIndex:1, fontSize: "smaller"}}
              classCard={" sticky-top mt-4 mb-4"}
              classTitle={" d-flex justify-content-left align-items-center p-3 border-bottom fs-6"}
              classBody={"overflw-y-auto p-0 "}
              classFooter={"d-flex justify-content-center align-item-center"}
              styleFooter={{}}
              classButtom={"rounded"}
              styleButtom={{fontSize: "small"}}        
              controls={[
                {
                  label: "Continuar a compra",
                  loadingLabel: "",
                  variant: "primary",
                  onClick: async () => {},
                },
              ]}
            >
                <Row>
                  <Col>Produtos</Col>
                </Row>
                <Row>
                  <Col>Produtos</Col>
                </Row>
                <Row>
                  <Col className="col-8">Total: $ </Col>
                  <Col className="col-4">{Number(total).toFixed(2)}</Col>
                </Row>
            </Card>
        </Col>
      </Row>
    </>
  );
};
