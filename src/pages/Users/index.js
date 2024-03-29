import { Container, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";

import { Card } from "../../components/Card";
import { logoutUsersSuccessType, openModalCreateUserType, saveUsersSuccessType } from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import { deleteUserAction, fetchUsersAction } from "../../actions/userActions";
import { openModalCreateUserAction } from "../../actions/modalsActions";
import { FloatingPillButton } from "../../components/FloatingPillButton";
import { ModalCreateUser } from "../../containers/ModalCreateUser";
import utilService from "../../services/utilService";

export const Users = () => {
  const { state,dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

  const usersTotalized = state.users.map(user => user);

  useEffect(() => {
    fetchUsersAction(dispatch);
  }, [dispatch]);

  const handleShowFeedback = async () => {
      setShowFeedback(true);
      await utilService.sleep(5000);
      setShowFeedback(false);
  }

  
   const handlePlusButtonClick = (productId) => {
    dispatch(openModalCreateUserAction())
  }

  
  const handleCreateOrUpdate = (product) => {
    dispatch(openModalCreateUserAction(product));
  };

  useEffect(() => {
    if (state.type === saveUsersSuccessType) {
      handleShowFeedback();
    } else if (state.type === logoutUsersSuccessType) {
      window.location.href = window.location.origin;
    }
  }, [state.type]);

  return (
    <div>
      
      <ModalCreateUser open={state.mode === openModalCreateUserType} />
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
    </div>
  );
};
