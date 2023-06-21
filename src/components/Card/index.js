import { useState } from "react";
import { Button } from "../Button/Button";
import {
  Card as CardBS,
  ButtonGroup,
  Col,
  Row,
} from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { CountButtonGroup } from "../CountButtonGroup";

export const Card = ({
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
    <CardBS>
      <CardBS.Body>
        <Row>
          <Col>
            <CardBS.Img
              src={image}
              alt="Card image"
              style={{ maxHeight: "6em", maxWidth: "6em" }}
            />
          </Col>
          <Col>
            <CardBS.Title>{title}</CardBS.Title>
            <CardBS.Subtitle>{subTitle}</CardBS.Subtitle>
          </Col>
        </Row>
      </CardBS.Body>
      <CardBS.Footer>
        
      {props.groupControls && <CountButtonGroup
      {...{total,
        onClick: props.groupControls.onClick, 
        element: product,
        contentlabel:'Compra',
        emptyLabel:'Remove'}}
      />}

        {controls
          ? controls.map((button, index) => (
            (button.freeShow || ['Master','Gestor'].includes(state?.currentUser?.type)) &&
              <Button
                key={button.label + id}
                variant={button.variant}
                loading={itemsLoading[button.label + id]}
                {...{
                  ...button,
                  onClick: () =>
                    handleItemLoading(button.label + id, button.onClick),
                }}
              />
            ))
          : ""}
      </CardBS.Footer>
    </CardBS>
  );
};
