import { useState } from "react";
import { Button } from "../Button";
import { Card as CardBS } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import type { ICard } from "./type";

export const Card = ({
  _id,
  image,
  title,
  subTitle,
  controls,
  ...props
}: ICard) => {

  const [itemsLoading, setItemsLoading] = useState<{ [key: string]: boolean }>({});
  const { state } = useAppContext();

  const handleItemLoading = async (field: string, onClick: () => void) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    await onClick();
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  return (
    <CardBS style={props.style}>
      {image && (
        <CardBS.Img src={image} style={{ width: '45%', height: 'auto', objectFit: 'cover' }} alt="Card image" />
      )}
      <CardBS.Body style={props.styleBody}>
        <CardBS.Title>{title}</CardBS.Title>
        <CardBS.Subtitle>{subTitle}</CardBS.Subtitle>
        {props.children ? props.children : ""}
        {props.hideControls ? (
          ""
        ) : (
          <CardBS.Footer
            style={props.styleFooter}
            className={props.classFooter}
          >

            {controls
              ? controls.map(
                  (button, index) =>
                    (button.freeshow ||
                      ["Master", "Gestor"].includes(
                        state?.currentUser?.type
                      )) && (
                      <Button
                        key={button.label + (_id || index)}
                        variant={button.variant}
                        loading={itemsLoading[button.label + (_id || index)]}
                        {...{
                          ...button,
                          onClick: () =>
                            handleItemLoading(
                              (button.label + (_id || index)) as string,
                              button.onClick
                            ),
                        }}
                      />
                    )
                )
              : ""}
          </CardBS.Footer>
        )}
      </CardBS.Body>
    </CardBS>
  );
};
