import { Container, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";

import { Card } from "../../components/Card";
import { openModalCreateUserType, saveChartsSuccessType } from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import { deleteUserAction, fetchUsersAction, openModalCreateUserAction, /* openModalCreateProductAction,  */sleep } from "../../storage/actions";
import { FloatingPillButton } from "../../components/FloatingPillButton/FloatingPillButton";
import { ModalCreateUser } from "../../containers/ModalCreateUser";

export const Users = () => {
  const { state,dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

  const usersTotalized = state.users.map(user => user);

  useEffect(() => {
    fetchUsersAction(dispatch);
  }, [dispatch]);

  const handleShowFeedback = async () => {
      setShowFeedback(true);
      await sleep(5000);
      setShowFeedback(false);
  }

  
   const handlePlusButtonClick = (productId) => {
    dispatch(openModalCreateUserAction())
  }

  useEffect(() => {
    if (state.type === saveChartsSuccessType) {
      handleShowFeedback();
    }
  }, [state.type]);

  return (
    <div>
      
      {state.mode + ' ' + openModalCreateUserType}
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
