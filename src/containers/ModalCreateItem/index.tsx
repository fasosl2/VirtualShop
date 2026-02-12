import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal";
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
} from "../../storage/actionConstants";
import utilService from "../../services/utilService";
import userLogo from "../../assets/user-logo.png"
import type { IModal } from "../../components/Modal/type";
import type { IItem } from "../../interfaces/Item";

export const ModalCreateItem = ({ open } : IModal) => {
  const { state, dispatch } = useAppContext();
  const [image, setImage] = useState<string>(userLogo);
  const initialItem = useRef<IItem>({
    title: "",
    description: "",
    stock: "",
    image: ""
  });
  const [itemData, setItemData] = useState<IItem>(initialItem.current);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
    if (state?.activeItem?._id && itemData === initialItem.current) {
      setItemData((prevState) => ({ ...prevState, ...state.activeItem }));
    }
    
    if(itemData?.image && typeof itemData.image === 'object' && (itemData.image as File).name) {
      const newPreview = async () =>{
        const preview = await utilService.imageToCompressedBase64(itemData.image);
        setImage(preview);
      } 
      newPreview();
    } else if (typeof itemData?.image === 'string' && itemData.image.length){
      setImage(itemData?.image);
    } else {
      setImage(userLogo);
    }
  }, [state.type, state.activeItem, dispatch, itemData.image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, field: keyof IItem): void => {
    if (field === 'image') {
      const files = (e.target as HTMLInputElement).files;
      setItemData((prevState) => ({...prevState, [field]: files?.[0] || "" }));
    } else {
      setItemData((prevState) => ({...prevState, [field]: (e.target as HTMLInputElement).value }));
    }
  };

  return (
    <Modal
      title={(state?.activeItem?._id ? "Editar" : "Criar") + " Item"}
      open={open}
      controls={[
        {
          label: (state?.activeItem?._id ? "Editar" : "Criar") + " e Salvar",
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
