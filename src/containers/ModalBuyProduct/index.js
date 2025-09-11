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
import { ImageContainer, ProductImage } from "./styles";

export const ModalCreateSchedule = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [startDate, setStartDate] = useState(new Date());
  const [count, setCount] = useState(1);
  

  useEffect(() => {
    if (state.type === closeModalsType) {
      setStartDate(new Date());
      setCount(1);
    }
  }, [state.type, state.activeProduct, dispatch]);



  const handleChartClick = async ({
    element,
    negativeValue,
    setItemsLoading,
    field,
  }) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    dispatch(
      negativeValue
        ? await deleteProductsFromChartAction(dispatch, element, negativeValue)
        : await saveProductsInChartAction(dispatch, element)
    );
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  const handleClick = async (field, element, total, onClick) => {
    setCount((prevState) => ({ ...prevState, [field]: true }));
    await onClick({ element, negativeValue: total, setCount, field });
    setCount((prevState) => ({ ...prevState, [field]: false }));
  };
  
  const filterPassedDate = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const day = date.getDay();
    return !state?.activeProduct?.blockedDays[day] &&
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
      title={"Comprar"}
      open={open}
      controls={[
        {
          label: "Confirmar",
          loadingLabel: "Confirmando",
          loading: state.type === saveProductsInChartInitType,
          variant: "primary",
          onClick: async ()  => {await dispatch(closeModalsAction()); },
        },
        {
           label: "Remover",
           loadingLabel: "Removendo",
           variant: "danger",
           onClick: async () => {
             if (state.activeProduct && state.chart?.products) {
               const productInChart = state.chart.products.find(
                 (p) => p.id === state.activeProduct.id
               );
               const quantityToRemove = productInChart ? productInChart.count : 0;

               if (quantityToRemove > 0) {
                 await handleChartClick({
                   element: state.activeProduct,
                   negativeValue: quantityToRemove,
                   setItemsLoading: () => {},
                 });
               }
             }
             dispatch(closeModalsAction());
           },
         },
      ]}
    >
      {state.activeProduct?.image && (
        <ImageContainer>
          <ProductImage
            src={state.activeProduct.image}
            alt={state.activeProduct.title}
          />
        </ImageContainer>
      )}
      {/* <Calendar 
      filterDate={filterPassedDate}
      // highlightDates={[new Date('2023-09-11')]}
      selectedDate= {startDate}
      setSelectedDate= {setStartDate}
      filterTime={filterPassedTime}
      /> */}
      quantidade:
      <br/>
      <CountButtonGroup
        {...{
          total: state.chart?.products?.find((chart) => chart.id === state.activeProduct?.id)?.count,
          onClick: handleChartClick,
          element: state.activeProduct,
          contentlabel: "Compra",
          //emptyLabel: "Remove",
        }}
      />
      {/* <Button label='-' onClick={()=> setCount((prevState) => (prevState > 1 ? prevState - 1 : 1))}/>
      {" " + count + "  "}
      <Button label='+' onClick={()=> setCount((prevState) => (prevState + 1))}/> */}
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
