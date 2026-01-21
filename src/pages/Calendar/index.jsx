import { Container, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { Card } from "../../components/Card";
import { openModalCreateCalendarType, saveCalendarsSuccessType } from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import {
  deleteCalendarAction,
  fetchCalendarsAction,
} from "../../actions/calendarAction";
import {
  openModalCreateCalendarAction,
} from "../../actions/modalsActions";
import { ModalCreateCalendar } from "../../containers/ModalCreateCalendar";
import { FloatingPillButton } from "../../components/FloatingPillButton";
import utilService from "../../services/utilService";

export const Calendar = () => {
  const { state, dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

  const calendarsProcessed = state.calendars.map((calendar) => ({
    ...calendar,
  }));

  useEffect(() => {
    fetchCalendarsAction(dispatch);
  }, [dispatch]);

  const handleShowFeedback = async () => {
    setShowFeedback(true);
    await utilService.sleep(5000);
    setShowFeedback(false);
  };

  const handleCreateOrUpdate = (calendar) => {
    dispatch(openModalCreateCalendarAction(calendar));
  };

  useEffect(() => {
    if (state.type === saveCalendarsSuccessType) {
      handleShowFeedback();
    }
  }, [state.type]);

  return (
    <div>
      <ModalCreateCalendar open={state.mode === openModalCreateCalendarType} />
      {['Master','Gestor'].includes(state?.currentUser?.type) && 
            (<FloatingPillButton label="+" onClick={handleCreateOrUpdate} />) }
      
      {showFeedback && (
        <Notification
          message="Criado com sucesso"
          onClose={() => {
            setShowFeedback(false);
          }}
        />
      )}
      <Container fluid>
          <Row>
          {calendarsProcessed.map((calendar) => (
            <Col key={calendar.id} xs={13} md={4} style={{ marginTop: "1em" }}>
              <Card
                {...{
                  ...calendar,
                  subTitle: <div>
                    <p>Descrição: {calendar.description}</p>
                    <p>Data:  {calendar?.date?.toLocaleDateString()}</p>
                    <p>Tipo: {calendar.type}</p>
                  </div>,
                  controls: [{
                      label: 'Editar',
                      loadingLabel: 'Editando',
                      variant: 'warning',
                      onClick: async () => {
                        handleCreateOrUpdate(calendar);
                      }
                    },{
                      label: 'Excluir',
                      loadingLabel: 'Excluindo',
                      variant: 'danger',
                      onClick: async () => {
                        await deleteCalendarAction(dispatch, calendar.id);
                      }
                  },
                ],
                }}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
