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

export const ChartList = ({ items = [], compact, ...props }) => {
  let total = 0;
  const location = useLocation();

  const [itemsLoading, setItemsLoading] = useState({});

  const handleClick = async (field, element, total, onClick) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    await onClick({ element, negativeValue: total, setItemsLoading, field });
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  return (
    <ContentSection compact={compact}>
      <RowTitle>
        
        {compact ? <Title5>itens no seu carrinho</Title5> : <Title5>Produtos</Title5>}
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
                  {!compact ? (
                    ""
                  ) : (
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
                        <Image src={lixeira} />
                      </ButtonLink>
                    </Col>
                  )}
                  <Image compact={compact} src={item.image} thumbnail={!compact} />
                </ColListGroup>

                {/* nome e botão de excluir */}
                <Col xs={8} md={4}>
                  <Row>
                    <Col className="pl-3">{item.title}</Col>
                  </Row>
                  <Row>
                    {compact ? (
                      ""
                    ) : (
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
                          {itemsLoading[item.id + "excluir"] ? "ndo" : "r"}{" "}
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
                    )}
                  </Row>
                </Col>

                {/* botões de quantidade  do produto */}
                {compact ? (
                  ""
                ) : (
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
                )}

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

      {compact ? (
        <Dropdown.Item className="p-0 ">
          <RowFooter className="p-0 m-0 d-flex justify-content-center align-items-center">
            <span>
              <Link
                className="text-decoration-none p-0 m-0 d-flex justify-content-center align-items-center"
                currentpath={location.pathname}
                to="/chart"
              >
                <Button
                  className="border-0 m-3 "
                  style={{
                    backgroundColor: "rgba(71, 91, 109)",
                    fontSize: "0.7rem",
                    minHeight: "40px",
                    width: "100%",
                  }}
                >
                  finalizar compra
                </Button>
              </Link>
            </span>
          </RowFooter>
        </Dropdown.Item>
      ) : (
        <RowFooter>
          <span>
            <ButtonLink>Adicione mais produtos!</ButtonLink>
          </span>
        </RowFooter>
      )}
    </ContentSection>
  );
};
