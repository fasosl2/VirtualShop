import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { saveCalendarsAction } from "../../actions/calendarAction";
import {
  closeModalsAction,
} from "../../actions/modalsActions";
import {
  closeModalsType,
  saveCalendarsInitType,
  saveCalendarsSuccessType,
} from "../../storage/actionConstants";
import type { ICalendar } from "../../interfaces/Calendar";
import type { IModal } from "../../components/Modal/type";

export const ModalCreateCalendar = ({ open }:IModal) => {
  const { state, dispatch } = useAppContext();
  const initialCalendar = useRef<ICalendar>({
    title: "",
    description: "",
    type: "Evento",
    date: ""
  });
  const [calendarData, setCalendarData] = useState<ICalendar>(initialCalendar.current);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    saveCalendarsAction(dispatch, { ...calendarData});
  };

  useEffect(() => {
    if (state.type === saveCalendarsSuccessType) {
      dispatch(closeModalsAction());
      setCalendarData(initialCalendar.current);
    }
    if (state.type === closeModalsType) {
      setCalendarData(initialCalendar.current);
    }
    if (state?.activeCalendar?._id && calendarData === initialCalendar.current) {
      setCalendarData((prevState) => ({ ...prevState, ...state.activeCalendar, date: state.activeCalendar.date instanceof Date ? state.activeCalendar.date.toISOString().slice(0,10) : state.activeCalendar.date || "" }));
    }
  }, [state.type, state.activeCalendar, dispatch, calendarData]);
    
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, field: keyof ICalendar): void => {
    setCalendarData((prevState) => ({...prevState, [field]: e.target.value }));
  };

  return (
    <Modal
      title={(state?.activeCalendar?._id ? "Editar" : "Criar") + " Evento"}
      open={open}
      controls={[
        {
          label: (state?.activeCalendar?._id ? "Editar" : "Criar") + " e Salvar",
          loadingLabel: "Criando",
          loading: state.type === saveCalendarsInitType,
          variant: "secondary",
          type: "submit",
          form: "create-calendar-form",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="create-calendar-form">
        <Form.Group className="mb-3" controlId="formCreateCalendar" 
        style={{display:'grid', justifyItems:'center'}}>
          <br />
          <Form.Control
            type="text"
            required
            placeholder="Nome do Evento"
            value={calendarData?.title}
            onChange={(e) => handleChange(e, "title")}
          />
          <br />
          <Form.Control
            type="text"
            required
            placeholder="Descrição do Evento"
            value={calendarData?.description}
            onChange={(e) => handleChange(e, "description")}
          />
          <br />
          <Form.Select
            required
            value={calendarData?.type}
            onChange={(e) => handleChange(e, "type")}
          >
            <option>Feriado</option>
            <option>Evento</option>
          </Form.Select>
          <br />
          <Form.Control
            type="date"
            required
            value={typeof calendarData?.date === "string" ? calendarData?.date : calendarData?.date?.toISOString().slice(0,10) || ""}
            onChange={(e) => handleChange(e, "date")}
          />
        </Form.Group>
      </Form>
    </Modal>
  );
};
