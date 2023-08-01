import { useState } from "react";
import { ListGroup as ListGroupBS, Spinner } from "react-bootstrap";
import {
  ContentSection,
  Title5,
  Col,
  Row,
  Image,
  RowTitle,
  RowBody,
  RowFooter,
  ColListGroup,
  ButtonLink,
  ListGroupBSItem,
  DropdownItem,
  Link,
} from "./styles";
import lixeira from "../../assets/lixeira.svg";
import x from "../../assets/x.svg";
import { CountButtonGroup } from "../CountButtonGroup";
import { useLocation } from "react-router-dom";

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
      <RowTitle compact={compact}>
        {compact ? (
          <Title5>itens no seu carrinho</Title5>
        ) : (
          <Title5>Produtos</Title5>
        )}
      </RowTitle>

      <RowBody>
        <ListGroupBS className="p-0">
          {items.map((item) => (
            <ListGroupBSItem compact={compact} key={item.id}>
              <noscript>{(total += item.value * item.total)}</noscript>
              <Row className="g-4 d-flex justify-content-center align-items-center">
                {/* Botão excluir e img para o pop ou so img */}
                <ColListGroup xs={compact ? 6 : 4} md={compact ? 6 : 2}>
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
                        <Image src={x} style={{width: "25px", height: "25px"}}/>
                      </ButtonLink>
                    </Col>
                  )}
                  <Col>
                    <Image
                      compact={compact}
                      src={item.image}
                      thumbnail={!compact}
                    />
                  </Col>
                </ColListGroup>

                {/* nome e botão de excluir*/}
                <Col xs={compact ? 6 : 8} md={compact ? 6 : 4} className="">
                  <Row>
                    <Col className="pl-3">{item.title}</Col>
                  </Row>
                  <Row>
                    {compact ? (
                      <Col>
                        {" R$ " +
                          String(
                            (Number(item.value) * Number(item.total)).toFixed(2)
                          ) +
                          " "}
                      </Col>
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
                {compact ? (
                  ""
                ) : (
                  <ColListGroup xs={6} md={3} style={{fontSize: "1rem"}}>
                    {" R$ " +
                      String(
                        (Number(item.value) * Number(item.total)).toFixed(2)
                      ) +
                      " "}
                  </ColListGroup>
                )}
              </Row>
            </ListGroupBSItem>
          ))}
        </ListGroupBS>
      </RowBody>

      {compact ? (
        <DropdownItem>
          <RowFooter compact={compact} className="m-0">
            <span>
              <Link currentpath={location.pathname} to="/chart">
                finalizar compra
              </Link>
            </span>
          </RowFooter>
        </DropdownItem>
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
