import { useState } from "react";
import { Button } from "../Button";
import { Card as CardBS } from "react-bootstrap";
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
    <CardBS style={props.style} className={props.classCard}>
      {image ? <CardBS.Img src={image} alt="Card image" /> : ""}
      <CardBS.Body style={props.styleBody}  className={props.classBody}>
        <CardBS.Title className={props.classTitle}>{title}</CardBS.Title>
        <CardBS.Subtitle>{subTitle}</CardBS.Subtitle>
        {props.children ? props.children : ""}
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
                    style={props.styleButtom}
                    className={props.classButtom}
                    key={button.label + id}
                    variant={button.variant}
                    loading={itemsLoading[button.label + id]}
                    {...{
                      ...button,
                      onClick: () =>
                        handleItemLoading(button.label + id, button.onClick),
                    }}
                  />
                )
            )
          : ""}
      </CardBS.Footer>
    </CardBS>
  );
};
