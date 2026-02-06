import { useState } from "react";
import { Button } from "../Button";
import { Card as CardBS, Col, Row } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { CountButtonGroup } from "../CountButtonGroup";
import { CardButtomContainer, CardHeader, CardImg, CardPrice } from "./styles";
import utilService from "../../services/utilService";
import type { IProduct } from "../../interfaces/Product";
import type { Item } from "../../interfaces/Item";


export const ProductCard = ({
  onClick,
  controls,
  ...product
}: IProduct) => {

  const [itemsLoading, setItemsLoading] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { state } = useAppContext();

  const handleItemLoading = async (
    field: string,
    onClick: () => Promise<void> | void
  ) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    await onClick();
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  return (
    <CardBS style={product.style}>
      <CardHeader>
        <Row>
          <Col>
            <CardBS.Title>{product.title}</CardBS.Title>
          </Col>
          <Col>
            <CardPrice>
              {Number(product.price)
                ? utilService.formatCurrency(Number(product.price))
                : "(Consultar)"}
            </CardPrice>
          </Col>
        </Row>
      </CardHeader>
      <CardBS.Body style={product.styleBody}>
        <Row>
          <Col
            md={5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardImg src={product.image} alt="Card image" />
          </Col>
          <Col
            md={7}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Row className="prod-description" style={{ flexGrow: 1 }}>
              <p>
                {product?.description?.slice(0, 200) +
                  ((product?.description?.length || 0) > 200 ? "..." : "")}
              </p>
              {product?.items &&
              typeof product.items !== "string" &&
              product.items.map((item: Item, index) => (
                <p key={index}>• {item.title}</p>
              ))}
            </Row>
            <Row className="prod-buttom">
              <CardButtomContainer>
                {product.groupControls && product?.total && (
                  <CountButtonGroup
                    {...{
                      total: product.total,
                      onClick: product.groupControls.onClick,
                      element: product,
                      contentlabel: "Compra",
                      emptyLabel: "Remove",
                    }}
                  />
                )}

                {controls
                  ? controls.map((button, index) =>
                      ((button.client &&
                        !["Master", "Gestor"].includes(
                          state?.currentUser?.type
                        )) ||
                        ["Master", "Gestor"].includes(
                          state?.currentUser?.type
                        )) && (
                        <Button
                          key={button.label + (product._id || index)}
                          variant={button.variant}
                          loading={itemsLoading[button.label + (product._id || index)]}
                          {...{
                            ...button,
                            onClick: () =>
                              handleItemLoading(
                                button.label + (product._id || index),
                                button.onClick
                              ),
                          }}
                        />
                      )
                    )
                  : ""}
              </CardButtomContainer>
            </Row>
          </Col>
        </Row>
      </CardBS.Body>
    </CardBS>
  );
};
