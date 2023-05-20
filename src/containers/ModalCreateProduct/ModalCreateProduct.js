import { useEffect, useMemo, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, saveProductsAction } from "../../storage/actions";
import {
  saveProductsInitType,
  saveProductsSuccessType,
} from "../../storage/types";
import utilService from "../../services/utilService";

export const ModalCreateProduct = ({ open }) => {
  const initialProduct = useMemo(()=>({
    title: "",
    description: "",
    price: '',
    stock: '',
    image: ''
  }),[]);
  const [productData, setProductData] = useState(initialProduct);
  const { state, dispatch } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let base64Image = await utilService.imageToCompressedBase64(productData.image);

    setProductData(prevState => ({...prevState, image: base64Image}));
    saveProductsAction(dispatch, {...productData, image: base64Image});
  };

  useEffect(() => {
    if (state.type === saveProductsSuccessType) {
      setProductData(initialProduct);
      dispatch(closeModalsAction());
    }
  }, [state.type, dispatch,initialProduct]);

  const handleChange = (e,field) => setProductData(prevState => ({...prevState,[field]: e.target?.files?.length ? e.target.files[0] : e.target.value}));
  
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
          <br/>
          <Form.Control
            type="file" required
            placeholder="Imagem do Produto"
            // value={productData?.image}
            onChange={(e) =>handleChange(e,'image')}
          />
        </Form.Group>
      </Form>
    </Modal>
  );
};
