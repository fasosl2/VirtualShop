import { useState } from "react";
import { Button } from "../Button";
import { Card as CardBS, Col, Row } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { CountButtonGroup } from "../CountButtonGroup";
import { CardButtomContainer, CardHeader, CardImg, CardPrice } from "./styles";

export const ProductCard = ({
  id,
  image,
  title,
  price,
  total,
  onClick,
  controls,
  ...props
}) => {
  const product = { id, image, title, total, price };

  const [itemsLoading, setItemsLoading] = useState({});
  const { state } = useAppContext();

  const handleItemLoading = async (field, onClick) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    await onClick();
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  return (
    <CardBS style={props.style}>
      <CardHeader>
        <Row>
          <Col>
            <CardBS.Title>{title}</CardBS.Title>
          </Col>
          <Col>
            <CardPrice>
              {Number(price)
                ? "R$ " + Number(price).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) : "(Consultar)"}
            </CardPrice>
          </Col>
        </Row>
      </CardHeader>
      <CardBS.Body style={props.styleBody}>
        <Row>
          <Col
            md={5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardImg src={image} alt="Card image" />
          </Col>
          <Col
            md={7}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Row className="prod-description" style={{ flexGrow: 1 }}>
              <p>{props.description}</p>
              {props?.items?.length
                ? props.items.map((item) => <p>• {item.title}</p>)
                : ""}
            </Row>
            <Row className="prod-buttom">
              <CardButtomContainer>
                {props.groupControls && total && (
                  <CountButtonGroup
                    {...{
                      total,
                      onClick: props.groupControls.onClick,
                      element: product,
                      contentlabel: "Compra",
                      emptyLabel: "Remove",
                    }}
                  />
                )}

                {controls
                  ? controls.map(
                      (button, index) =>
                        ((button.client &&
                          !["Master", "Gestor"].includes(
                            state?.currentUser?.type
                          )) ||
                          ["Master", "Gestor"].includes(
                            state?.currentUser?.type
                          )) && (
                          <Button
                            key={button.label + (id || index)}
                            variant={button.variant}
                            loading={itemsLoading[button.label + (id || index)]}
                            {...{
                              ...button,
                              onClick: () =>
                                handleItemLoading(
                                  button.label + (id || index),
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
