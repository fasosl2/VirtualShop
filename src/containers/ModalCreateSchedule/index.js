import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
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
import { Button } from "../../components/Button";
import { CountButtonGroup } from "../../components/CountButtonGroup";

export const ModalCreateSchedule = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [startDate, setStartDate] = useState(new Date());
  const [count, setCount] = useState(1);
  

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


  const handleClick = async (field, element, total, onClick) => {
    setCount((prevState) => ({ ...prevState, [field]: true }));
    await onClick({ element, negativeValue: total, setCount, field });
    setCount((prevState) => ({ ...prevState, [field]: false }));
  };
  
  const filterPassedDate = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const day = date.getDay();
    return day !== 0 && day !== 6 &&
    currentDate <= selectedDate;
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime() && 
    selectedDate.getHours() >= 8 && selectedDate.getHours() < 23;
  };

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
      filterDate={filterPassedDate}
      // highlightDates={[new Date('2023-09-11')]}
      startDate= {startDate}
      setStartDate= {setStartDate}
      filterTime={filterPassedTime}
      />
      quantidade de pessoas:
      <br/>
      <Button label='-' onClick={()=> setCount((prevState) => (prevState > 1 ? prevState - 1 : 1))}/>
      {" " + count + " "}
      <Button label='+' onClick={()=> setCount((prevState) => (prevState + 1))}/>
      {/* <p>

        <CountButtonGroup
          total= {count} 
          onClick= {()=> setCount((prevState) => (prevState + 1))}
          contentlabel= "qtd"
        >
          </CountButtonGroup>  
          <br/>
          {count}
        </p> */}
        {/* {startDate.toLocaleString()} */}
        {console.log(startDate)}
    </Modal>
  );
};
