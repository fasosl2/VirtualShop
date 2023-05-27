import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, saveUsersAction } from "../../storage/actions";
import {
  closeModalsType,
  saveUsersInitType,
  saveUsersSuccessType,
} from "../../storage/types";
import utilService from "../../services/utilService";
import userLogo from "../../assets/user-logo.png"

export const ModalCreateUser = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [image , setImage ] = useState(userLogo);
  const initialUser = useRef({
      name: "",
      email: "",
      password: "",
      type: "Cliente",
      image: "",
    });
  const [userData, setUserData] = useState(initialUser.current);

  const handleSubmit = async (e) => {
    e.preventDefault();

    saveUsersAction(dispatch, { ...userData, image: image });
  };

  useEffect(() => {
    if (state.type === saveUsersSuccessType) {
      dispatch(closeModalsAction());
      setUserData(initialUser.current);
    }
    if (state.type === closeModalsType) {
      setImage(userLogo);
      setUserData(initialUser.current);
    }
    if (state?.activeUser?.id && userData === initialUser.current) {
      setUserData((prevState) => ({ ...prevState, ...state.activeUser }));
    }
    
    if(userData?.image?.name) {
      const newPreview = async () =>{
        const preview = await utilService.imageToCompressedBase64(userData.image);
        setImage(preview);
      } 
      newPreview();
    } else if (userData?.image?.length){
      setImage(userData?.image);
    }else{
      setImage(userLogo);
    }
  }, [state.type, state.activeUser, dispatch, userData.image]);

  const handleChange = (e, field) => setUserData((prevState) => ({...prevState, [field]: field === 'image'? e.target.files[0] : e.target.value }));

  return (
    <Modal
      title={(state?.activeUser?.id ? "Editar" : "Criar") + " Usuário"}
      open={open}
      controls={[
        {
          label: (state?.activeUser?.id ? "Editar" : "Criar") + " e Salvar",
          loadingLabel: "Criando",
          loading: state.type === saveUsersInitType,
          variant: "secondary",
          type: "submit",
          form: "create-user-form",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="create-user-form">
        <Form.Group className="mb-3" controlId="formCreateUser"
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
            placeholder="Nome do Usuário"
            value={userData?.name}
            onChange={(e) => handleChange(e, "name")}
          />
          <br />
          <Form.Control
            type="email"
            required
            placeholder="E-mail"
            value={userData?.email}
            disabled={state?.activeUser?.id ? true : false}
            onChange={(e) => handleChange(e, "email")}
          />
          <br />
          <Form.Control
            type="password"
            required={state?.activeUser?.id ? false : true}
            disabled={state?.activeUser?.id ? true : false}
            placeholder="Senha"
            value={userData?.password}
            onChange={(e) => handleChange(e, "password")}
          />
          <br />
          <Form.Select
            required
            value={userData?.type}
            onChange={(e) => handleChange(e, "type")}
          >
            <option>Master</option>
            <option>Gestor</option>
            <option>Cliente</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Modal>
  );
};
