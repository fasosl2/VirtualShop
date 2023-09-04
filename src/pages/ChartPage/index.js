import { ChartList } from "../../components/ChartList";
import { useAppContext } from "../../storage/AppContext";
import { useEffect } from "react";
import { deleteChartAction, fetchChartsAction } from "../../actions/chartActions";
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
import bag from "../../assets/bag.svg";
import moment from "moment";
import { savePurchasesAction } from "../../actions/purchasesAction";

export const ChartPage = () => {
  const { state, dispatch } = useAppContext();

  const handleClick = async ({
    product,
    negativeValue,
    setItensLoading,
    field,
  }) => {
    setItensLoading((prevState) => ({ ...prevState, [product.id]: true }));
    dispatch(
      negativeValue
        ? await deleteProductsFromChartAction(dispatch, product, negativeValue)
        : await saveProductsInChartAction(dispatch, product)
    );
    setItensLoading((prevState) => ({ ...prevState, [product.id]: false }));
  };
  useEffect(() => {
    fetchChartsAction(dispatch);
  }, [dispatch]);

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

  const handleCreatePurchase = async () => {
    savePurchasesAction(dispatch, {
      user: state?.currentUser._id,
      products: state.chart?.products?.map((product) => ({
        id: product.id,
        count: product.count,
        date: product.startDate,
        onClick: handleChartClick,
      })),
    });
    deleteChartAction(dispatch);
  };

  return (
    <ChartPageContainer>
      <Row>
        <Col md={9}>
          <ChartList
            items={state.chart?.products?.map((product) => ({
              key: product.id,
              id: product.id,
              value: product.price || "$0,00",
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
                <Col>Produtos</Col>
              </Row>
              <Row className="p-0 m-0">
                <Col className="col-8">Total: R$ </Col>
                <Col className="col-4">
                  {state.chart?.products.length ?
                  Number(
                    state.chart?.products.reduce(
                      (total, product) => product.price * product.count + total,
                      0
                    )
                  ).toFixed(2) : '----'}
                </Col>
              </Row>
              <Row className="p-0 m-0">
                <Col md={5} className="col-8">
                  Data:{" "}
                </Col>
                <Col md={7} className="col-4">
                  {state.chart?.products[0]?.startDate ? moment(state.chart?.products[0]?.startDate)
                    .utc()
                    .format("DD-MM-YYYY") : '----'}
                </Col>
                {console.log(state?.chart?.products[0]?.startDate)}
              </Row>
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
  );
};
