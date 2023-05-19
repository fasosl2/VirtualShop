import { Dropdown, DropdownButton, Form, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { LoginContainer } from "../../containers/LoginContainer";

export const HeaderPartial = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">VirtualShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/produtos">
              Produtos
            </Link>
          </Nav>
          <Nav className="justify-content-end">
            <Link className="nav-link" to="chart">
              🛒 Carrinho
            </Link>
            <LoginContainer />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
