import { Container, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { Card } from "../../components/Card";
import { logoutUsersSuccessType, saveUsersSuccessType } from "../../storage/types";
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

  // Pagination state
  const [page, setPage] = useState(state.users?.page || 1);
  const [pages, setPages] = useState(state.users?.pages || 1);
  const [limit, setLimit] = useState(10);

  const usersArray = state.users?.list || [];
  const usersTotalized = usersArray.map(user => user);

  useEffect(() => {
    fetchUsersAction(dispatch, { page, limit });
  }, [dispatch, page, limit]);

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
