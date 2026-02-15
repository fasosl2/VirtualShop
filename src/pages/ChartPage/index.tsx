import { ChartList } from "../../components/ChartList";
import { useAppContext } from "../../storage/AppContext";
import { useEffect, useState } from "react";
import {
  deleteChartAction,
  fetchChartsAction,
} from "../../actions/chartActions";
import {
  deleteProductsFromChartAction,
  saveProductsInChartAction,
} from "../../actions/productActions";
import {
  Button,
  ChartPageContainer,
  Col,
  Container,
  ContentSection,
  Image,
  Row,
  Title5,
} from "./styles";

import { ContentDiv } from "../../styles/global";
import bag from "../../assets/bag.svg";
import moment from "moment";
import { savePurchasesAction } from "../../actions/purchasesAction";
import { Notification } from "../../components/Notification";
import utilService from "../../services/utilService";
import { Form } from "react-bootstrap";
import type { IProduct } from "../../interfaces/Product";
import type { IChartItemClickParams } from "../../components/CountButtonGroup/type";
import type { IChartProduct } from "../../interfaces/Chart";

export const ChartPage = () => {
  const { state, dispatch } = useAppContext();

  const [deliveryDate, setDeliveryDate] = useState<moment.Moment | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("A Combinar");

  useEffect(() => {
    if (state.currentUser?.deliveryDay) {
      const dayMap: { [key: string]: number } = {
        Domingo: 0,
        "Segunda-feira": 1,
        "Terça-feira": 2,
        "Quarta-feira": 3,
        "Quinta-feira": 4,
        "Sexta-feira": 5,
        Sábado: 6,
      };
      const targetDayIndex = dayMap[state.currentUser.deliveryDay];

      if (typeof targetDayIndex === "number") {
        const nextDate = moment();
        let daysToAdd = (targetDayIndex - nextDate.day() + 7) % 7;
        if (daysToAdd === 0) daysToAdd = 7; // Always schedule for the next upcoming day
        setDeliveryDate(nextDate.add(daysToAdd, "days"));
      }
    }
  }, [state.currentUser]);
  const [showFeedback, setShowFeedback] = useState<string>(null);
  const handleShowFeedback = async (message: string) => {
    setShowFeedback(message);
    await utilService.sleep(5000);
    setShowFeedback(null);
  };
  const feedbackMesage: { [key: string]: string } = {
    warning: "Adicione itens ao carrinho!",
    danger: "Faça login com um usuário válido!",
    success: "Compra efetuada com sucesso!",
  };

  useEffect(() => {
    fetchChartsAction(dispatch);
  }, [dispatch]);

  // const handleClick = async ({
  //   element,
  //   negativeValue,
  //   setItemsLoading,
  // }: IChartItemClickParams) => {
  //   setItemsLoading((prevState) => ({ ...prevState, [element._id]: true }));
    
  //   if(negativeValue){
  //     await deleteProductsFromChartAction(dispatch, element, negativeValue)
  //   }else{
  //     await saveProductsInChartAction(dispatch, element)
  //   }
    
  //   setItemsLoading((prevState) => ({ ...prevState, [element._id]: false }));
  // };

  const handleChartClick = async ({
    element,
    negativeValue,
    setItemsLoading,
    field,
  }: IChartItemClickParams) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    
    if(negativeValue){
      await deleteProductsFromChartAction(dispatch, element, negativeValue)
    }else{
      await saveProductsInChartAction(dispatch, element)
    }

    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  const handleCreatePurchase = async () => {
    if (!state?.currentUser?._id) {
      handleShowFeedback("danger");
    } else if (!state?.chart?.products?.length) {
      handleShowFeedback("warning");
    } else {
      savePurchasesAction(dispatch, {
        user: state?.currentUser?._id,
        deliveryDate: deliveryDate,
        paymentStatus: "Pendente",
        deliveryStatus: "Pendente",
        paymentMethod: paymentMethod,
        // Envia para o backend apenas os campos necessários
        products: state.chart?.products?.map(({ _id, count }: IChartProduct) => ({
          _id,
          count,
        })),
      });
      deleteChartAction(dispatch);
      handleShowFeedback("success");
    }
  };

  return (
    <ContentDiv>
      <ChartPageContainer>
        {showFeedback && (
          <Notification
            variant={showFeedback}
            message={feedbackMesage[showFeedback as string]}
            onClose={() => {
              setShowFeedback(null);
            }}
          />
        )}
        <Row>
          <Col md={9}>
            <ChartList
              items={state.chart?.products?.map((product: IChartProduct) => ({
                _id: product._id,
                value: product.price || 0,
                title: product.title,
                total: product.count,
                image: product.image,
                date: product.startDate,
                onClick: handleChartClick,
              }))}
            />
          </Col>
          <Col md={3}>
            <ContentSection className="sticky-top" style={{ zIndex: "0" }}>
              <Row className="border-bottom pt-3 pb-3 pl-2 m-0 ">
                <span>
                  <Title5>
                    <Image src={bag} className="m-1 mt-0" />
                    Resumo de Compras
                  </Title5>
                </span>
              </Row>
              <Row className="p-3">
                <Row className="p-0 m-0">
                  <Col>
                    <strong>Produtos</strong>
                  </Col>
                </Row>
                <Row className="p-0 m-0">
                  <Col className="col-5">Total:</Col>
                  <Col className="col-7">
                    R${" "}
                    {state.chart?.products.length
                      ? Number(
                          state.chart?.products.reduce(
                            (total: number, product: IProduct) =>
                              (product.price || 0) * (product.count || 0) +
                              total,
                            0
                          )
                        ).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "----"}
                  </Col>
                </Row>
                <Row className="p-0 m-0 mt-2">
                  <Col className="col-5">Data de Entrega: </Col>
                  <Col className="col-7">
                    {deliveryDate
                      ? deliveryDate.format("DD/MM/YYYY")
                      : "Indefinida"}
                    <p>{state.currentUser?.deliveryDay}</p>
                  </Col>
                </Row>
                <Row className="p-0 m-0 mt-3">
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>
                        <strong>Forma de Pagamento</strong>
                      </Form.Label>
                      <Form.Select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <option value="A Combinar">A Combinar</option>
                        <option value="Pix">Pix</option>
                        <option value="Cartão de Crédito">
                          Cartão de Crédito
                        </option>
                        <option value="Cartão de Crédito">
                          Cartão de Débito
                        </option>
                        <option value="Dinheiro">Dinheiro</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                {/* <Row className="p-0 m-0">
                <Col md={5} className="col-8">
                  Data:{" "}
                </Col>
                <Col md={7} className="col-4">
                  {state.chart?.products[0]?.startDate ? moment(state.chart?.products[0]?.startDate)
                    .utc()
                    .format("DD-MM-YYYY") : '----'}
                </Col>
                {console.log(state?.chart?.products[0]?.startDate)}
              </Row> */}
              </Row>

              <Row>
                <Container>
                  <Button
                    onClick={() => handleCreatePurchase()}
                    className="border-0 m-3"
                    style={{
                      backgroundColor: "rgba(71, 91, 109)",
                      fontSize: "0.7rem",
                      minHeight: "40px",
                      width: "100%",
                    }}
                  >
                    Finalizar a compra
                  </Button>
                </Container>
              </Row>
            </ContentSection>
          </Col>
        </Row>
      </ChartPageContainer>
    </ContentDiv>
  );
};
