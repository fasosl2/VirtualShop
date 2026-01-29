import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { Card } from "../../components/Card";
import { logoutUsersSuccessType, saveUsersSuccessType } from "../../storage/actionConstants";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import { deleteUserAction, fetchUsersAction } from "../../actions/userActions";
import { openModalCreateUserAction } from "../../actions/modalsActions";
import { FloatingPillButton } from "../../components/FloatingPillButton";
import { ModalCreateUser } from "../../containers/ModalCreateUser";
import utilService from "../../services/utilService";
import { ContentDiv } from "../../styles/global";
import { Pagination } from "../../components/Pagination";

export const Users = () => {
  const { state, dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

  const [page, setPage] = useState(state.users?.page || 1);
  const [pages, setPages] = useState(state.users?.pages || 1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    neighborhood: "",
    status: "",
    hasOpenDeliveries: "",
  });
  const [apiFilters, setApiFilters] = useState({});

  const usersArray = state.users?.list || [];
  const usersTotalized = usersArray.map(user => user);

  // Efeito para a busca inicial de usuários
  useEffect(() => {
    fetchUsersAction(dispatch, { page: 1, limit: 10 });
  }, [dispatch]);

  useEffect(() => {
    fetchUsersAction(dispatch, { page, limit, ...apiFilters });
  }, [dispatch, page, limit, apiFilters]);

  useEffect(() => {
    setPages(state.users?.pages || 1);
  }, [state.users?.pages]);

  const handleShowFeedback = async () => {
      setShowFeedback(true);
      await utilService.sleep(5000);
      setShowFeedback(false);
  }

  
   const handlePlusButtonClick = (productId) => {
    dispatch(openModalCreateUserAction())
  }

  
  const handleCreateOrUpdate = (user) => {
    dispatch(openModalCreateUserAction(user));
  };

  useEffect(() => {
    if (state.type === saveUsersSuccessType) {
      handleShowFeedback();
    } else if (state.type === logoutUsersSuccessType) {
      window.location.href = window.location.origin;
    }
  }, [state.type]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    const newFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
    setPage(1);
    setApiFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ neighborhood: "", status: "", hasOpenDeliveries: "" });
    setApiFilters({});
    setPage(1);
  };

  return (
    <ContentDiv>
      <FloatingPillButton label="+"  onClick={handlePlusButtonClick}/>
      {showFeedback && (
        <Notification
          message="Criado com sucesso"
          onClose={() => {
            setShowFeedback(false);
          }}
        />
      )}
      <Container>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyFilters();
          }}
        >
          <Row className="align-items-end mb-3 gy-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  name="neighborhood"
                  value={filters.neighborhood}
                  onChange={handleFilterChange}
                  placeholder="Ex: Boa Viagem"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="">Todos</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Entregas em aberto</Form.Label>
                <Form.Select name="hasOpenDeliveries" value={filters.hasOpenDeliveries} onChange={handleFilterChange}>
                  <option value="">Todos</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="d-flex gap-2 ms-auto">
              <Button type="submit" className="w-100">Filtrar</Button>
              <Button variant="secondary" onClick={handleClearFilters} className="w-100">Limpar</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container fluid>
        <Row >
        {usersTotalized.map((user) =>(
          <Col key={user._id} xs={13} md={4} style={{marginTop:'1em'}}>
            <Card
                {...{
                  ...user,
                  title: user.name,
                  subTitle: user.email,
                  controls: [{
                    label: 'Editar',
                    loadingLabel: 'Editando',
                    variant: 'warning',
                    onClick: async () => {
                      handleCreateOrUpdate(user);
                    }
                  },{
                    label: 'Excluir',
                    loadingLabel: 'Excluindo',
                    variant: 'danger',
                    onClick: async () => {
                      await deleteUserAction(dispatch, user.id);
                    }
                  }
                ]
                }}
            />
          </Col>
        ))}
        </Row>
      </Container>
      <Pagination
        {...{ page, pages, setPage, limit, setLimit, itemsArray: usersArray }}
      />
    </ContentDiv>
  );
};
