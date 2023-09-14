import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Button, Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { saveProductsAction } from "../../actions/productActions";
import {
  closeModalsAction,
  openModalSaveItemsAction,
} from "../../actions/modalsActions";
import {
  closeModalsType,
  saveProductsInitType,
  saveProductsSuccessType,
} from "../../storage/types";
import utilService from "../../services/utilService";
import userLogo from "../../assets/user-logo.png";
import { Col, Row } from "./styles";
import { MultiRatio } from "../../components/MultiRatio";

export const ModalCreateProduct = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [image, setImage] = useState(userLogo);
  const initialProduct = useRef({
    //mudar e adicionar itens que esta no figma 'nome legal'
    title: "",
    description: "",
    price: "",
    priceRecife: "",
    priceRMR: "",
    minPeople: "",
    maxPeople: "",
    stock: "",
    image: "",
    items: [],
    blockedDays: [false,false,false,false,false,false,false],
  });
  const [productData, setProductData] = useState(initialProduct.current); // o negocio que vai mandar os dados

  const handleSubmit = async (e) => {
    e.preventDefault();

    saveProductsAction(dispatch, { ...productData, image: image });
  };

  useEffect(() => {
    if (state.type === saveProductsSuccessType) {
      dispatch(closeModalsAction());
      setProductData(initialProduct.current);
    }
    if (state.type === closeModalsType) {
      setImage(userLogo);
      setProductData(initialProduct.current);
    }
    if (state?.activeProduct?.id && productData === initialProduct.current) {
      setProductData((prevState) => ({ ...prevState, ...state.activeProduct }));
    }

    if (productData?.image?.name) {
      const newPreview = async () => {
        const preview = await utilService.imageToCompressedBase64(
          productData.image
        );
        setImage(preview);
      };
      newPreview();
    } else if (productData?.image?.length) {
      setImage(productData?.image);
    } else {
      setImage(userLogo);
    }
    if (state?.selectedItems?.length) {
      setProductData((prevState) => ({
        ...prevState,
        items: state.selectedItems,
      }));
    }
  }, [
    state.type,
    state.activeProduct,
    dispatch,
    productData.image,
    state.selectedItems,
  ]);

  const handleChange = (e, field) =>
    setProductData((prevState) => ({
      ...prevState,
      [field]: field === "image" ? e.target.files[0] : e.target.value,
    }));

  const handleItemClick = () =>
    dispatch(openModalSaveItemsAction(productData?.items));

    const handleBlockedDays = (index) =>
    setProductData((prevState) => {
    let blockedDays = [...prevState.blockedDays];
    blockedDays[index] = blockedDays[index] ? false : true;
    return {
      ...prevState,
      blockedDays: blockedDays,
    }
    });

  return (
    <Modal
      // title={(state?.activeProduct?.id ? "Editar" : "Criar") + " Produto"}
      open={open}
      controls={[
        {
          label: (state?.activeProduct?.id ? "Editar" : "Criar") + " e Salvar",
          loadingLabel: "Criando",
          loading: state.type === saveProductsInitType,
          variant: "secondary",
          type: "submit",
          form: "create-product-form",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="create-product-form">
        <Form.Group
          className="mb-3"
          controlId="formCreateProduct"
          style={{ display: "grid", justifyItems: "center" }}
        >
          <Row>
            <Col md={3}>
              <img src={image} alt="" style={{ height: "20vh" }} />
              <Form.Control
                type="file"
                onChange={(e) => handleChange(e, "image")}
              />
            </Col>
            <Col md={9}>
              <Row>
                <Col md={7}>
                  <Row>
                  <Form.Label>Nome do serviço</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Nome do Produto"
                    value={productData?.title}
                    onChange={(e) => handleChange(e, "title")}
                  />
                  </Row>
                  <br/>
                  <Row>
                  <Form.Label>descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    required
                    placeholder="descrição"
                    value={productData?.description}
                    onChange={(e) => handleChange(e, "description")}
                  />
                  </Row>
                </Col>
                <Col md={5}>
                  <Row>
                  <Form.Label>preço sem frete</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="preço sem frete"
                    value={productData?.price}
                    onChange={(e) => handleChange(e, "price")}
                  />
                  </Row>
                  <br/>
                  <Row>
                  <Form.Label>preço com frete Recife</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="preço com frete Recife"
                    value={productData?.priceRecife}
                    onChange={(e) => handleChange(e, "priceRecife")}
                  />
                  </Row>
                  <br/>
                  <Row>
                  <Form.Label>preço com frete RMR</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="preço com frete RMR"
                    value={productData?.priceRMR}
                    onChange={(e) => handleChange(e, "priceRMR")}
                  />
                  </Row>
                  <br/>
                  {/* <Form.Control
                    type="number"
                    required
                    placeholder="Quantidade em Estoque"
                    value={productData?.stock}
                    onChange={(e) => handleChange(e, "stock")}
                  /> */}
                  <Row>
                  <Form.Label>número de pessoas</Form.Label>
                    <Col>
                    <Form.Label>mínimo</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="Quantidade em Estoque"
                    value={productData?.minPeople}
                    onChange={(e) => handleChange(e, "minPeople")}
                  />
                  </Col>
                  <Col>
                  <Form.Label>máximo</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="Quantidade em Estoque"
                    value={productData?.maxPeople}
                    onChange={(e) => handleChange(e, "maxPeople")}
                  />
                  </Col>
                  </Row>
                  {/* <Button variant="light"
                        style={{width:'100%',textAlign:'start',
                        border: '1px solid #ced4da',
                        borderRadius: '0.375rem'}}
                        onClick={handleItemClick}>
                          {productData?.items.length 
                          ? productData?.items?.map(ele => <p key={ele.id}>{ele.total} - {ele.title}</p>) 
                          : "Selecionar Itens"}
                   </Button> */}
                </Col>
              </Row>
              <Row>
                <p>dias disponiveis horário disponiveis</p>
                <MultiRatio
                onClick={handleBlockedDays}
                elements={productData?.blockedDays}
                controls={[{
                  label:'D'
                },{
                  label:'S'
                },{
                  label:'T'
                },{
                  label:'Q'
                },{
                  label:'Q'
                },{
                  label:'S'
                },{
                  label:'S'
                },]}
                />
              </Row>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Modal>
  );
};
