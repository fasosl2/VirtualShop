import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, saveProductsAction } from "../../storage/actions";
import { saveProductsInitType, saveProductsSuccessType } from "../../storage/types";

export const ModalCreateProduct = ({ open }) => {
    const [productName,setProductName] = useState('');
    const { state, dispatch } = useAppContext();
    const handleSubmit = (e) =>{
        e.preventDefault();
        saveProductsAction(dispatch,productName)
    }
    useEffect(() => {
      if (state.type === saveProductsSuccessType) {
        setProductName('');
        dispatch(closeModalsAction());
      }
    }, [state.type,dispatch]);

    const handleChange = (e) => setProductName(e.target.value);
  return (
    <Modal
      title="Criar Product"
      open={open}
      controls={[
        {
          label: "Criar e Salvar",
          loadingLabel: "Criando",
          loading: state.type === saveProductsInitType,
          variant: "secondary",
          type: "submit",
          form: "form-criar-pasta",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="form-criar-pasta">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome do Product</Form.Label>
          <Form.Control type="text" placeholder="Ex: Trigonometria" value={productName} onChange={handleChange}/>
        </Form.Group>
      </Form>
    </Modal>
  );
};
