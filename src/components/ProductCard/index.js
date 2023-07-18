import { useState } from "react";
import { Button } from "../Button";
import { Card as CardBS, Col, Row } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { CountButtonGroup } from "../CountButtonGroup";

export const ProductCard = ({
  id,
  image,
  title,
  price,
  total,
  subTitle,
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
    <CardBS.Header>
      <Row>
    <Col md={5}>
        <CardBS.Title>{title}</CardBS.Title>
    </Col>
    <Col md={5}>
        <CardBS.Title>{subTitle}</CardBS.Title>
    </Col>
      </Row>
    </CardBS.Header>
      <CardBS.Body style={props.styleBody}>
      <Row>
    <Col md={5}>
      <CardBS.Img src={image} style={{width: '100%'}} alt="Card image" />
    </Col>
    <Col md={5}>
      <p>{props.description}</p>
        {props.children ? props.children : ""}
    </Col>
      </Row>
      </CardBS.Body>
      <CardBS.Footer style={props.styleFooter} className={props.classFooter}>
        {props.groupControls && (
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
                (button.freeShow ||
                  ["Master", "Gestor"].includes(state?.currentUser?.type)) && (
                  <Button
                    key={button.label + (id || index)}
                    variant={button.variant}
                    loading={itemsLoading[button.label + (id || index)]}
                    {...{
                      ...button,
                      onClick: () =>
                        handleItemLoading(button.label + (id || index), button.onClick),
                    }}
                  />
                )
            )
          : ""}
      </CardBS.Footer>
    </CardBS>
  );
};
