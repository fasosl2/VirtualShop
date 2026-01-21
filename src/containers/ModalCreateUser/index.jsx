import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { saveUsersAction } from "../../actions/userActions";
import {
  closeModalsType,
  saveUsersInitType,
  saveUsersSuccessType,
} from "../../storage/types";
import { closeModalsAction } from "../../actions/modalsActions";
import utilService from "../../services/utilService";
import userLogo from "../../assets/user-logo.png";

export const ModalCreateUser = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [image, setImage] = useState(userLogo);
  const initialUser = useRef({
    name: "",
    cpf: "",
    phone: "",
    email: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      uf: "PE",
      referencePoint: "",
    },
    observations: "",
    password: "",
    type: "Cliente",
    image: "",
    deliveryDay: "",
    frequency: "Semanal",
    status: "Ativo",
  });
  const [userData, setUserData] = useState(initialUser.current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { address, ...rest } = userData;
    const payload = {
      ...rest,
      image: userData.image,
      address: {
        street: address.street,
        number: address.number,
        neighborhood: address.neighborhood,
        city: address.city,
        uf: address.uf,
        referencePoint: address.referencePoint,
      },
    };
    saveUsersAction(dispatch, payload);
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
      const { address, ...rest } = state.activeUser;
      setUserData((prevState) => ({
        ...prevState,
        ...rest,
        address: {
          street: address?.street || address?.rua || "",
          number: address?.number || address?.numero || "",
          neighborhood: address?.neighborhood || address?.bairro || "",
          city: address?.city || address?.cidade || "",
          uf: address?.uf || address?.estado || "",
          referencePoint:
            address?.referencePoint || address?.pontoReferencia || "",
        },
      }));
    }

    if (userData?.image?.name) {
      const newPreview = async () => {
        const preview = await utilService.imageToCompressedBase64(
          userData.image
        );
        setImage(preview);
      };
      newPreview();
    } else if (userData?.image?.length) {
      setImage(userData?.image);
    } else {
      setImage(userLogo);
    }
  }, [state.type, state.activeUser, dispatch, userData.image]);

  const handleChange = (e, field, subField = null) => {
    const { value } = e.target;
    setUserData((prevState) => {
      if (subField) {
        return {
          ...prevState,
          [field]: { ...prevState[field], [subField]: value },
        };
      }
      return {
        ...prevState,
        [field]: field === "image" ? e.target.files[0] : value,
      };
    });
  };

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
        <Form.Group
          className="mb-3"
          controlId="formCreateUser"
          style={{ display: "grid", justifyItems: "center" }}
        >
          <img src={image} alt="" style={{ height: "20vh" }} />
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
            type="text"
            required
            placeholder="CPF"
            value={userData?.cpf}
            onChange={(e) => handleChange(e, "cpf")}
          />
          <br />
          <Form.Control
            type="text"
            required
            placeholder="Telefone"
            value={userData?.phone}
            onChange={(e) => handleChange(e, "phone")}
          />
          <br />
          <Form.Control
            type="email"
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
          <Row className="w-100">
            <Col md={9}>
              <Form.Control
                type="text"
                required
                placeholder="Rua"
                value={userData?.address?.street}
                onChange={(e) => handleChange(e, "address", "street")}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                required
                placeholder="Número"
                value={userData?.address?.number}
                onChange={(e) => handleChange(e, "address", "number")}
              />
            </Col>
          </Row>
          <br />
          <Row className="w-100">
            <Col md={3}>
              <Form.Control
                type="text"
                required
                placeholder="Bairro"
                value={userData?.address?.neighborhood}
                onChange={(e) => handleChange(e, "address", "neighborhood")}
              />
            </Col>
            <Col md={7}>
              <Form.Control
                type="text"
                required
                placeholder="Cidade"
                value={userData?.address?.city}
                onChange={(e) => handleChange(e, "address", "city")}
              />
            </Col>
            <Col>
              <Form.Select
                name="uf"
                required
                value={userData?.address?.uf}
                onChange={(e) => handleChange(e, "address", "uf")}>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </Form.Select>
            </Col>
          </Row>
          <br />
          <Form.Control
            type="text"
            placeholder="Ponto de Referência"
            value={userData?.address?.referencePoint}
            onChange={(e) => handleChange(e, "address", "referencePoint")}
          />
          <br />
          {["Master", "Gestor"].includes(state?.currentUser?.type) && (
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Observações"
              value={userData?.observations}
              onChange={(e) => handleChange(e, "observations")}
            />
          )}
          <br />
          {["Master", "Gestor"].includes(state?.currentUser?.type) && (
            <Row className="w-100">
              <Col>
                <Form.Label>Dia de Entrega</Form.Label>
                <Form.Select
                  value={userData?.deliveryDay}
                  onChange={(e) => handleChange(e, "deliveryDay")}
                >
                  <option value="">Selecione um dia</option>
                  <option value="Domingo">Domingo</option>
                  <option value="Segunda-feira">Segunda-feira</option>
                  <option value="Terça-feira">Terça-feira</option>
                  <option value="Quarta-feira">Quarta-feira</option>
                  <option value="Quinta-feira">Quinta-feira</option>
                  <option value="Sexta-feira">Sexta-feira</option>
                  <option value="Sábado">Sábado</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Frequência</Form.Label>
                <Form.Select
                  value={userData?.frequency}
                  onChange={(e) => handleChange(e, "frequency")}
                >
                  <option value="">Nenhuma</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Quinzenal">Quinzenal</option>
                  <option value="Mensal">Mensal</option>
                </Form.Select>
              </Col>
            </Row>
          )}
          <br />
          {["Master", "Gestor"].includes(state?.currentUser?.type) && (
            <Row className="w-100">
              <Col>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={userData?.status || "Ativo"}
                  onChange={(e) => handleChange(e, "status")}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Tipo de usuário</Form.Label>
                <Form.Select
                  required
                  value={userData?.type}
                  onChange={(e) => handleChange(e, "type")}
                >
                  <option>Master</option>
                  <option>Gestor</option>
                  <option>Cliente</option>
                </Form.Select>
              </Col>
            </Row>
          )}
        </Form.Group>
      </Form>
    </Modal>
  );
};
