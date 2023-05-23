import { useEffect, useMemo, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, saveUsersAction } from "../../storage/actions";
import {
  saveProductsInitType,
  saveUsersSuccessType,
} from "../../storage/types";
import utilService from "../../services/utilService";

export const ModalCreateUser = ({ open }) => {
  const initialUser = useMemo(
    () => ({
      name: "",
      email: "",
      password: "",
      type: "",
      image: "",
    }),
    []
  );
  const [userData, setUserData] = useState(initialUser);
  const { state, dispatch } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let base64Image = await utilService.imageToCompressedBase64(userData.image);

    setUserData((prevState) => ({ ...prevState, image: base64Image }));
    saveUsersAction(dispatch, { ...userData, image: base64Image });
  };

  useEffect(() => {
    if (state.type === saveUsersSuccessType) {
      setUserData(initialUser);
      dispatch(closeModalsAction());
    }
  }, [state.type, dispatch, initialUser]);

  const handleChange = (e, field) =>
    setUserData((prevState) => ({
      ...prevState,
      [field]: e.target?.files?.length ? e.target.files[0] : e.target.value,
    }));

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
            onChange={(e) => handleChange(e, "email")}
          />
          <br />
          <Form.Control
            type="password"
            required
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
          <br />
          <Form.Control
            type="file"
            required
            placeholder="Imagem do Produto"
            // value={productData?.image}
            onChange={(e) => handleChange(e, "image")}
          />
        </Form.Group>
      </Form>
    </Modal>
  );
};
