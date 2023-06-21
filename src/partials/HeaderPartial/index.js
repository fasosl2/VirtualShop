import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "./styles";
import { LoginContainer } from "../../containers/LoginContainer";
import { useAppContext } from "../../storage/AppContext";
import navbarLogo from "../../assets/navbar-logo.svg";
import { useLocation } from "react-router-dom";

export const HeaderPartial = () => {
  const { state } = useAppContext();
  const location = useLocation();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><img src={navbarLogo} alt="cozinha+"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav className="justify-content-end">
            <Link currentpath={location.pathname} to="/">
              home
            </Link>
            <Link currentpath={location.pathname} to="/produtos">
              catálogo
            </Link>
            {['Master','Gestor'].includes(state?.currentUser?.type) && 
            (<Link currentpath={location.pathname} to="/itens">
              itens
          </Link>) }
            {state?.currentUser?.type === 'Master' && 
            (<Link currentpath={location.pathname} to="/usuarios">
              usuários
          </Link>) }
            <Link currentpath={location.pathname} to="/chart">
              carrinho
            </Link>
            <LoginContainer />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
