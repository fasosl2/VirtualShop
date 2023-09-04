import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { HomeContainer, Link } from "./styles";
import { LoginContainer } from "../../containers/LoginContainer";
import { useAppContext } from "../../storage/AppContext";
import navbarLogo from "../../assets/navbar-logo.svg";
import { useLocation } from "react-router-dom";
import { ChartContainer } from "../../containers/ChartContainer";

export const HeaderPartial = () => {
  const { state } = useAppContext();
  const location = useLocation();

  return ( 
    <Navbar bg="light" expand="lg">
      <HomeContainer>
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
          
          {/* ['Master','Gestor'].includes(state?.currentUser?.type) &&  */
            state?.currentUser?.type &&
            (<Link currentpath={location.pathname} to="/pedidos">
              Pedidos
          </Link>) }
            {state?.currentUser?.type === 'Master' && 
            (<Link currentpath={location.pathname} to="/usuarios">
              usuários
          </Link>) }
            <Link currentpath={location.pathname} to="/about">
              ong GTP+
            </Link>
            {/* <Link currentpath={location.pathname} to="/chart" >

            </Link> */}
              <ChartContainer/>
            <LoginContainer />
          </Nav>
        </Navbar.Collapse>
      </HomeContainer>
    </Navbar>
  );
};
