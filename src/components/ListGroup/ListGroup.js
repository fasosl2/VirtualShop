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
    <ListGroupBS style={{height:'70vh'}}>
      {items.map((item) => (
        <ListGroupBS.Item key={item.id} >
          <noscript>{total+=(item.value * item.total)}</noscript>
          <Row className="g-4">
            <Col xs={8} md={6}>
              {'Cod. ' + item.id + ' - ' + item.title}
              </Col>
            <Col xs={13} md={3} >
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
              <Button onClick={() => handleClick(item, 0,item.onClick)} variant='light'>˄</Button>
              <Button  variant='light'>
                <Badge bg="secondary">{item.total}</Badge>
              </Button>
              <Button onClick={() => handleClick(item, 1,item.onClick)} variant='light'>˅</Button>
            </>
          ) : (
            ""
          )}
        </ButtonGroup>
        
            </Col>              
            <Col xs={12} md={3}>
        {' $ '+ String((Number(item.value) * Number(item.total)).toFixed(2)) + ' '}
              </Col>
          </Row>
        </ListGroupBS.Item>
      ))}
    </ListGroupBS>
    <h1>Total: $ {Number(total).toFixed(2)}</h1>
  </>
  );
};
