import { useState } from "react";
import { Badge, ButtonGroup, Col, ListGroup as ListGroupBS, Row, Spinner } from "react-bootstrap";
import {Button } from "react-bootstrap";

export const ListGroup = ({ items = [] }) => {

  let total = 0;
  const [itemsLoading, setItemsLoading] = useState({});

  const handleClick = async (product, total, onClick) => {
    await onClick(product, total, setItemsLoading);
  };
  
  return (<>
    <ListGroupBS>
      {items.map((item) => (
        <ListGroupBS.Item key={item.id}>
          {total+=item.value}
          <Row>
            <Col xs={8}>
              {'Cod. ' + item.id + ' - ' + item.title}
              </Col>
            <Col xs={4} className="text-end">
            {item.value + ' '}
            <ButtonGroup className="mb-2">
          <Button
            variant={item.total ? "danger" : "primary"}
            onClick={() => handleClick(item, item.total,item.onClick)}
          >
            {item.total ? "Remove" : "Compra"}
            {itemsLoading[item.id] ? "ndo" : "r"}{" "}
            {itemsLoading[item.id] && (
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
          {item.total ? (
            <>
              <Button onClick={() => handleClick(item, 0,item.onClick)}>˄</Button>
              <Button>
                <Badge bg="secondary">{item.total}</Badge>
              </Button>
              <Button onClick={() => handleClick(item, 1,item.onClick)}>˅</Button>
            </>
          ) : (
            ""
          )}
        </ButtonGroup>
            </Col>
          </Row>
        </ListGroupBS.Item>
      ))}
    </ListGroupBS>
    <h1>Total: {total}</h1>
  </>
  );
};
