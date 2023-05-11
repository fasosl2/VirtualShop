import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, saveProductsAction } from "../../storage/actions";
import {
  saveProductsInitType,
  saveProductsSuccessType,
} from "../../storage/types";

export const ModalCreateProduct = ({ open }) => {
  const initialProduct = {
    title: "",
    description: "",
    price: null,
    stock: null,
  }
  const [productData, setProductData] = useState(initialProduct);
  const { state, dispatch } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    saveProductsAction(dispatch, productData);
  };
  useEffect(() => {
    if (state.type === saveProductsSuccessType) {
      setProductData(initialProduct);
      dispatch(closeModalsAction());
    }
  }, [state.type, dispatch,initialProduct]);

  const handleChange = (e,field) => setProductData(prevState => ({...prevState,[field]:e.target.value}));
  return (
    <Modal
      title="Criar Produto"
      open={open}
      controls={[
        {
          label: "Criar e Salvar",
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
        <Form.Group className="mb-3" controlId="formCreateProduct">
          <Form.Control
            type="text" required
            placeholder="Nome do Produto"
            value={productData?.title}
            onChange={(e) =>handleChange(e,'title')}
          />
          <br/>
          <Form.Control
            type="text" required
            placeholder="Descrição"
            value={productData?.description}
            onChange={(e) =>handleChange(e,'description')}
          />
          <br/>
          <Form.Control
            type="number" required
            placeholder="Preço do Producto"
            value={productData?.price}
            onChange={(e) =>handleChange(e,'price')}
          />
          <br/>
          <Form.Control
            type="number" required
            placeholder="Quantidade em Estoque"
            value={productData?.stock}
            onChange={(e) =>handleChange(e,'stock')}
          />
        </Form.Group>
      </Form>
    </Modal>
  );
};
