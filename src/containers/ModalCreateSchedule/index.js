import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Button, Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { deleteProductsFromChartAction, saveProductsAction, saveProductsInChartAction } from "../../actions/productActions";
import {
  closeModalsAction, openModalSaveItemsAction,
} from "../../actions/modalsActions";
import {
  closeModalsType,
  saveProductsInChartInitType,
  saveProductsInitType,
  saveProductsSuccessType,
} from "../../storage/types";
import utilService from "../../services/utilService";
import userLogo from "../../assets/user-logo.png"
import { Calendar } from "../../components/Calendar";

export const ModalCreateSchedule = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [startDate, setStartDate] = useState(new Date());
  const [count, setCount] = useState(0);
  

  useEffect(() => {
    if (state.type === saveProductsInChartInitType) {
      dispatch(closeModalsAction());
      setStartDate(new Date());
      setCount(0);
    }
    if (state.type === closeModalsType) {
      setStartDate(new Date());
      setCount(0);
    }

  }, [state.type, state.activeProduct, dispatch]);



  return (
    <Modal
      title={"Agendar"}
      open={open}
      controls={[
        {
          label: "Agendar",
          loadingLabel: "Agendando",
          loading: state.type === saveProductsInChartInitType,
          variant: "secondary",
          onClick: async ()  => {await saveProductsInChartAction(dispatch,{count,startDate, ...state.activeProduct})},
        },
      ]}
    >
      
      
      <Calendar 
      startDate= {startDate}
      setStartDate= {setStartDate}
      />
      quantidade de pessoas:
      <br/>
      <Button onClick={()=> setCount((prevState) => (prevState + 1))}>+</Button>
      {" " + count + " "}
      <Button onClick={()=> setCount((prevState) => (prevState ? prevState - 1 : 0))}>-</Button>
      <p>
      {startDate.toLocaleString()}
      <br/>
      {count}
      </p>
    </Modal>
  );
};
