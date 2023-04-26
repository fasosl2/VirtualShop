import { useState } from "react";
import {
  Button,
  Badge,
  Card as CardBS,
  ButtonGroup,
  Spinner,
} from "react-bootstrap";

export const Card = ({ id, image, title, total, onClick, price }) => {
  const product = { id, image, title,price };

  const [itemLoading, setItemLoading] = useState(false);

  const handleClick = async (product, total) => {
    await onClick(product, total, setItemLoading);
  };

  return (
    <CardBS>
      <CardBS.Img src={image} alt="Card image" />
      <CardBS.ImgOverlay></CardBS.ImgOverlay>
      <CardBS.Body>
        <CardBS.Title>{title}</CardBS.Title>
        <CardBS.Title>{price}</CardBS.Title>

        <ButtonGroup className="mb-2">
          <Button
            variant={total ? "danger" : "primary"}
            onClick={() => handleClick(product, total)}
          >
            {total ? "Remove" : "Compra"}
            {itemLoading ? "ndo" : "r"}{" "}
            {itemLoading && (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </>
            )}
          </Button>
          {total ? (
            <>
              <Button onClick={() => handleClick(product)}>˄</Button>
              <Button>
                <Badge bg="secondary">{total}</Badge>
              </Button>
              <Button onClick={() => handleClick(product, 1)}>˅</Button>
            </>
          ) : (
            ""
          )}
        </ButtonGroup>
      </CardBS.Body>
    </CardBS>
  );
};
