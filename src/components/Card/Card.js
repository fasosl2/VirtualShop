import { useState } from "react";
import {
  Button,
  Badge,
  Card as CardBS,
  ButtonGroup,
  Spinner,
  Col,
  Row,
} from "react-bootstrap";

export const Card = ({ id, image, title, total, onClick, price }) => {
  const product = { id, image, title,price };

  const [itemLoading, setItemLoading] = useState(false);

  const handleClick = async (product, total) => {
    await onClick(product, total, setItemLoading);
  };

  return (
    <CardBS>
      <CardBS.Body>
        <Row>
        <Col>
      <CardBS.Img src={image} alt="Card image" style={{maxHeight:'6em', maxWidth:'6em'}}/>
      <CardBS.ImgOverlay></CardBS.ImgOverlay>
      </Col>
      <Col>
        <CardBS.Title>{title}</CardBS.Title>
        <CardBS.Title>${String(price.toFixed(2))}</CardBS.Title>

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
        </Col></Row>
      </CardBS.Body>
    </CardBS>
  );
};
