import React, { useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";
// import { Button } from "../../components/Button";
import {
  Container,
  LoginImage,
  Form,
  H6,
  FormControl,
  Button,
  Hr,
} from "./styles";
import { useAppContext } from "../../storage/AppContext";
import {
  authUsersAction,
  loginUsersAction,
  logoutUsersAction,
} from "../../actions/userActions";
import {
  loginUsersSuccessType,
  openModalCreateUserType,
} from "../../storage/types";
import { openModalCreateUserAction } from "../../actions/modalsActions";
import { ModalCreateUser } from "../../containers/ModalCreateUser";

export const LoginContainer = () => {
  const initialLoginData = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );
  const [loginData, setLoginData] = useState(initialLoginData);
  const { state, dispatch } = useAppContext();

  const handleCreateUser = (productId) => {
    dispatch(openModalCreateUserAction());
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...loginData };
    // Se não contiver letras, remove a formatação para enviar apenas os números
    if (!/[a-zA-Z]/.test(payload.email)) {
      payload.email = payload.email.replace(/\D/g, "");
    }
    loginUsersAction(dispatch, payload);
  };

  const handleLogoutSubmit = async (e) => {
    e.preventDefault();
    logoutUsersAction(dispatch);
  };

  useEffect(() => {
    if (state.type === loginUsersSuccessType) {
      setLoginData(initialLoginData);
    }
  }, [state.type, dispatch, initialLoginData]);

  useEffect(() => {
    authUsersAction(dispatch);
  }, [dispatch]);

  const handleChange = (e, field) => {
    let { value } = e.target;

    if (field === "email") {
      const onlyNumbers = value.replace(/\D/g, "");

      // Se o valor não contiver letras, consideramos que é um telefone
      if (!/[a-zA-Z]/.test(value)) {
        let formatted = onlyNumbers;

        // Adiciona DDD 81 se o usuário digitar 8 ou 9 números
        // if (formatted.length === 8 || formatted.length === 9) {
        //   formatted = "81" + formatted;
        // }

        // Aplica a máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
        formatted = formatted.slice(0, 11);
        if (formatted.length > 10) {
          value = formatted.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (formatted.length > 6) {
          value = formatted.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        } else if (formatted.length > 2) {
          value = formatted.replace(/(\d{2})(\d+)/, "($1) $2");
        } else {
          value = formatted;
        }
      }
    }
    setLoginData((prevState) => ({ ...prevState, [field]: value }));
  };

  const propertiesMap = [
    {
      prop: "name",
      name: "nome",
    },
    {
      prop: "email",
      name: "e-mail",
    },
    {
      prop: "type",
      name: "tipo",
    },
    {
      prop: "phone",
      name: "telefone",
    },
  ];

  return (
    <Dropdown id={"dropdown"}>
      <ModalCreateUser open={state.mode === openModalCreateUserType} />
      <Dropdown.Toggle variant="light">
        {state.currentUser?.name?.split(" ")[0] || "login"}
      </Dropdown.Toggle>
      <Dropdown.Menu align="end">
        {state?.currentUser ? (
          <Container>
            <LoginImage src={state.currentUser?.image} alt="no image" />
            <p>
              {propertiesMap.map((ele) => (
                <span key={ele.prop}>
                  {ele.name + ": " + state.currentUser[ele.prop]}
                  <br />
                </span>
              ))}
            </p>
            <Button
              label="Sair"
              loadingLabel="Saindo"
              loading={false}
              variant="primary"
              type="submit"
              form="login-form"
              onClick={handleLogoutSubmit}
            />
          </Container>
        ) : (
          <Container>
            <H6>Faça seu login</H6>
            <Form onSubmit={handleLoginSubmit} id="login-form">
              <Form.Group className="mb-3" controlId="loginForm">
                <label>usuário</label>
                <FormControl
                  type="text"
                  required
                  placeholder="Telefone (com DDD) ou email"
                  value={loginData?.email}
                  onChange={(e) => handleChange(e, "email")}
                />
                <label>senha</label>
                <FormControl
                  type="password"
                  required
                  placeholder="senha"
                  value={loginData?.password}
                  onChange={(e) => handleChange(e, "password")}
                />
                <Hr />
                <Button
                  label="Entrar"
                  loadingLabel="Entrando"
                  loading={false}
                  variant="primary"
                  type="submit"
                  form="login-form"
                  onClick={() => {}}
                />
              </Form.Group>
            </Form>
            <p style={{ textAlign: "center" }}>ou</p>
            <Button
              label="Criar Conta"
              loadingLabel="Criando"
              loading={false}
              variant="primary"
              onClick={handleCreateUser}
            />
          </Container>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
