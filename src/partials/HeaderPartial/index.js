import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { LoginContainer } from "../../containers/LoginContainer";
import { useAppContext } from "../../storage/AppContext";

export const HeaderPartial = () => {
  const { state } = useAppContext();
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
            {['Master','Gestor'].includes(state?.currentUser?.type) && 
            (<Link className="nav-link" to="/itens">
            Itens
          </Link>) }
            {state?.currentUser?.type === 'Master' && 
            (<Link className="nav-link" to="/usuarios">
            Usuários
          </Link>) }
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
