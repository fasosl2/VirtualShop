import React, { useState } from "react";
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
  TextLink,
  TextButton,
  ListGroupBSItem,
  DropdownItem,
  ButtonLink,
} from "./styles";
import x from "../../assets/x.svg";
import { CountButtonGroup } from "../CountButtonGroup";
import type { IChartProduct } from "../../interfaces/Chart";
import type { IChartList, ItemOnClick } from "./type";

export const ChartList: React.FC<IChartList> = ({
  items = [],
  compactChart,
}) => {
  let total = 0;
  
  const [itemsLoading, setItemsLoading] = useState<Record<string, boolean>>({});

  const handleClick = async (
    field: string,
    element: IChartProduct,
    total: number,
    onClick: ItemOnClick
  ) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    await onClick({ element, negativeValue: total, setItemsLoading, field });
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  return (
    <ContentSection $compactChart={compactChart}>
      <RowTitle $compactChart={compactChart}>
        {compactChart ? (
          <Title5>itens no seu carrinho</Title5>
        ) : (
          <Title5>Produtos</Title5>
        )}
      </RowTitle>

      <RowBody>
        <ListGroupBS className="p-0">
          {items.map((item) => (
            <ListGroupBSItem $compactChart={compactChart} key={item._id}>
              <noscript>{(total += item.value * item.total)}</noscript>
              <Row className="g-4 d-flex justify-content-center align-items-center">
                {/* Botão excluir e img para o pop ou so img */}
                <ColListGroup xs={compactChart ? 6 : 4} md={compactChart ? 6 : 2}>
                  {!compactChart ? (
                    ""
                  ) : (
                    <Col style={{ paddingLeft: "0" }}>
                      <TextButton
                        onClick={() =>
                          handleClick(
                            item._id + "excluir",
                            item,
                            item.total,
                            item.onClick
                          )
                        }
                      >
                        <Image
                          src={x}
                          style={{ width: "25px", height: "25px" }}
                        />
                      </TextButton>
                    </Col>
                  )}
                  <Col>
                    <Image
                      $compactChart={compactChart}
                      src={item.image}
                      thumbnail={!compactChart}
                    />
                  </Col>
                </ColListGroup>

                {/* nome e botão de excluir*/}
                <Col xs={compactChart ? 6 : 8} md={compactChart ? 6 : 4} className="">
                  <Row>
                    <Col className="pl-3">{item.title}</Col>
                  </Row>
                  <Row>
                    {compactChart ? (
                      <Col>
                        {" R$ " +
                          String(
                            (Number(item.value) * Number(item.total)).toFixed(2)
                          ) +
                          " "}
                      </Col>
                    ) : (
                      <Col style={{ paddingLeft: "0" }}>
                        <TextButton
                          onClick={() =>
                            handleClick(
                              item._id + "excluir",
                              item,
                              item.total,
                              item.onClick
                            )
                          }
                        >
                          {item.total ? "Exclui" : ""}
                          {itemsLoading[item._id + "excluir"] ? "ndo" : "r"}{" "}
                          {itemsLoading[item._id + "excluir"] && (
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
                        </TextButton>
                      </Col>
                    )}
                  </Row>
                </Col>

                {/* botões de quantidade  do produto */}
                {compactChart ? (
                  ""
                ) : (
                  <ColListGroup xs={6} md={3}>
                    <CountButtonGroup
                      {...{
                        total: item.total,
                        count: item.total,
                        onClick: item.onClick,
                        element: item,
                        contentLabel: "Compra",
                      }}
                    />
                  </ColListGroup>
                )}

                {/* valor x quantidade */}
                {compactChart ? (
                  ""
                ) : (
                  <ColListGroup xs={6} md={3} style={{ fontSize: "1rem" }}>
                    {" R$ " +
                      String(
                        (
                          Number(item.value) * Number(item.total)
                        ).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      ) +
                      " "}
                  </ColListGroup>
                )}
              </Row>
            </ListGroupBSItem>
          ))}
        </ListGroupBS>
      </RowBody>

      {compactChart ? (
        <DropdownItem as="div">
          <RowFooter $compactChart={compactChart} className="m-0">
            <span>
              <ButtonLink to="/chart">
                finalizar compra
              </ButtonLink>
            </span>
          </RowFooter>
        </DropdownItem>
      ) : (
        <RowFooter>
          <span>
            <TextLink to="/produtos">
              Adicione {items?.length ? 'mais' : ''} produtos!
            </TextLink>
          </span>
        </RowFooter>
      )}
    </ContentSection>
  );
};
