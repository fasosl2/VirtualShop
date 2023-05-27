import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, saveProductsAction } from "../../storage/actions";
import {
  closeModalsType,
  saveProductsInitType,
  saveProductsSuccessType,
} from "../../storage/types";
import utilService from "../../services/utilService";
import userLogo from "../../assets/user-logo.png"

export const ModalCreateProduct = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [image , setImage ] = useState(userLogo);
  const initialProduct = useRef({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: ""
  });
  const [productData, setProductData] = useState(initialProduct.current);

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
    
    if(productData?.image?.name) {
      const newPreview = async () =>{
        const preview = await utilService.imageToCompressedBase64(productData.image);
        setImage(preview);
      } 
      newPreview();
    } else if (productData?.image?.length){
      setImage(productData?.image);
    }else{
      setImage(userLogo);
    }
  }, [state.type, state.activeProduct, dispatch, productData.image]);

  const handleChange = (e, field) => setProductData((prevState) => ({...prevState, [field]: field === 'image'? e.target.files[0] : e.target.value }));

  return (
    <Modal
      title={(state?.activeProduct?.id ? "Editar" : "Criar") + " Produto"}
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
        <Form.Group className="mb-3" controlId="formCreateProduct" 
        style={{display:'grid', justifyItems:'center'}}>
          <img src={image} alt="" style={{height:'20vh'}}/>
          <br />
          <br />
          <Form.Control
            type="file"
            onChange={(e) => handleChange(e, "image")}
          />
          <br />
          <Form.Control
            type="text"
            required
            placeholder="Nome do Produto"
            value={productData?.title}
            onChange={(e) => handleChange(e, "title")}
          />
          <br />
          <Form.Control
            type="text"
            required
            placeholder="Descrição"
            value={productData?.description}
            onChange={(e) => handleChange(e, "description")}
          />
          <br />
          <Form.Control
            type="number"
            required
            placeholder="Preço do Producto"
            value={productData?.price}
            onChange={(e) => handleChange(e, "price")}
          />
          <br />
          <Form.Control
            type="number"
            required
            placeholder="Quantidade em Estoque"
            value={productData?.stock}
            onChange={(e) => handleChange(e, "stock")}
          />
        </Form.Group>
      </Form>
    </Modal>
  );
};
