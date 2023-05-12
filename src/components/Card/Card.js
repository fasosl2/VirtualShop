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

  const handleChartClick = async (product, total) => {
    await onClick.chart(product, total, setItemLoading);
  };

  const handleDeleteClick = async (productId) => {
    await onClick.delete(productId, setItemLoading);
  };

  return (
    <CardBS>
      <CardBS.Body>
        <Row>
        <Col>
      <CardBS.Img src={image} alt="Card image" style={{maxHeight:'6em', maxWidth:'6em'}}/>
      
      </Col>
      <Col>
        <CardBS.Title>{title}</CardBS.Title>
        <CardBS.Title>${String(Number(price).toFixed(2))}</CardBS.Title>     
        <ButtonGroup className="mb-2">
          <Button
            variant={total ? "danger" : "primary"}
            onClick={() => handleChartClick(product, total)}
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
              <Button onClick={() => handleChartClick(product)} variant='light'>˄</Button>
              <Button variant='light'>
                <Badge bg="secondary">{total}</Badge>
              </Button>
              <Button onClick={() => handleChartClick(product, 1)}  variant='light'>˅</Button>
            </>
          ) : (
            ""
          )}
        </ButtonGroup>
        <br/>
        <Button variant="danger" onClick={() => handleDeleteClick(id)}>
          Excluir
        </Button>
        </Col></Row>
      </CardBS.Body>
    </CardBS>
  );
};
