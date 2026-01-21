import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { saveItemsAction } from "../../actions/itemsAction";
import {
  closeModalsAction,
} from "../../actions/modalsActions";
import {
  closeModalsType,
  saveItemsInitType,
  saveItemsSuccessType,
} from "../../storage/types";
import utilService from "../../services/utilService";
import userLogo from "../../assets/user-logo.png"

export const ModalCreateItem = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [image , setImage ] = useState(userLogo);
  const initialItem = useRef({
    title: "",
    description: "",
    stock: "",
    image: ""
  });
  const [itemData, setItemData] = useState(initialItem.current);

  const handleSubmit = async (e) => {
    e.preventDefault();

    saveItemsAction(dispatch, { ...itemData, image: image });
  };

  useEffect(() => {
    if (state.type === saveItemsSuccessType) {
      dispatch(closeModalsAction());
      setItemData(initialItem.current);
    }
    if (state.type === closeModalsType) {
      setImage(userLogo);
      setItemData(initialItem.current);
    }
    if (state?.activeItem?.id && itemData === initialItem.current) {
      setItemData((prevState) => ({ ...prevState, ...state.activeItem }));
    }
    
    if(itemData?.image?.name) {
      const newPreview = async () =>{
        const preview = await utilService.imageToCompressedBase64(itemData.image);
        setImage(preview);
      } 
      newPreview();
    } else if (itemData?.image?.length){
      setImage(itemData?.image);
    }else{
      setImage(userLogo);
    }
  }, [state.type, state.activeItem, dispatch, itemData.image]);

  const handleChange = (e, field) => setItemData((prevState) => ({...prevState, [field]: field === 'image'? e.target.files[0] : e.target.value }));

  return (
    <Modal
      title={(state?.activeItem?.id ? "Editar" : "Criar") + " Item"}
      open={open}
      controls={[
        {
          label: (state?.activeItem?.id ? "Editar" : "Criar") + " e Salvar",
          loadingLabel: "Criando",
          loading: state.type === saveItemsInitType,
          variant: "secondary",
          type: "submit",
          form: "create-item-form",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="create-item-form">
        <Form.Group className="mb-3" controlId="formCreateItem" 
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
            placeholder="Nome do Item"
            value={itemData?.title}
            onChange={(e) => handleChange(e, "title")}
          />
          <br />
          <Form.Control
            type="text"
            required
            placeholder="Descrição"
            value={itemData?.description}
            onChange={(e) => handleChange(e, "description")}
          />
          <br />
          <Form.Control
            type="number"
            required
            placeholder="Quantidade em Estoque"
            value={itemData?.stock}
            onChange={(e) => handleChange(e, "stock")}
          />
        </Form.Group>
      </Form>
    </Modal>
  );
};
