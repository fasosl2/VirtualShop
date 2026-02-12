import { ButtonGroup } from "react-bootstrap";
import { Button } from "../Button";
import React, { useState } from "react";
import type { ICountButtonGroup } from "./type";


export const CountButtonGroup: React.FC<ICountButtonGroup> = ({
  total,
  onClick,
  element,
  contentLabel,
  emptyLabel,
}) => {
  const [itemsLoading, setItemsLoading] = useState<Record<string, boolean>>({});

  return (
    <ButtonGroup>
      {emptyLabel ? (
        <Button
          variant={total ? "danger" : "primary"}
          label={(total ? emptyLabel : contentLabel) + "r"}
          loadingLabel={(total ? emptyLabel : contentLabel) + "ndo"}
          loading={itemsLoading["groupPrimary"]}
          onClick={() =>
            onClick({
              element,
              negativeValue: total ?? null,
              setItemsLoading,
              field: "groupPrimary",
            })
          }
        />
      ) : (
        ""
      )}

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
          label={total || 0}
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
    </ButtonGroup>
  );
};
