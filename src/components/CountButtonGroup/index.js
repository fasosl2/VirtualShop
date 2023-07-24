import { ButtonGroup } from "react-bootstrap";
import { Button } from "../Button";
import { useState } from "react";

export const CountButtonGroup = ({
  total,
  onClick,
  element,
  contentlabel,
  emptyLabel,
}) => {
  const [itemsLoading, setItemsLoading] = useState({});

  return (
    <ButtonGroup>
      {emptyLabel ? (
        <Button
          variant={total ? "danger" : "primary"}
          label={(total ? emptyLabel : contentlabel) + "r"}
          loadingLabel={(total ? emptyLabel : contentlabel) + "ndo"}
          loading={itemsLoading["groupPrimary"]}
          onClick={() =>
            onClick({
              element,
              negativeValue: total,
              setItemsLoading,
              field: "groupPrimary",
            })
          }
        />
      ) : (
        ""
      )}

      {total ? (
        <>
          <Button
            variant="light"
            label="˄"
            onClick={() =>
              onClick({
                element,
                negativeValue: null,
                setItemsLoading,
                field: "groupTotal",
              })
            }
          />

          <Button
            label={total}
            badge="secondary"
            loadingLabel=""
            variant="light"
            loading={itemsLoading["groupTotal"]}
          />
          <Button
            variant="light"
            label="˅"
            onClick={() =>
              onClick({
                element,
                negativeValue: 1,
                setItemsLoading,
                field: "groupTotal",
              })
            }
          />
        </>
      ) : (
        ""
      )}
    </ButtonGroup>
  );
};
