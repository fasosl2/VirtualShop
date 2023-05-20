import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Button } from "../../components/Button/Button";
import { Container } from "./styles";
import { useAppContext } from "../../storage/AppContext";
import { authUsersAction, loginUsersAction } from "../../storage/actions";
import { loginUsersSuccessType } from "../../storage/types";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUsersAction(dispatch, { ...loginData });
  };

  useEffect(() => {
    if (state.type === loginUsersSuccessType) {
      setLoginData(initialLoginData);
    }
  }, [state.type, dispatch, initialLoginData]);

  
  useEffect(() => {
    authUsersAction(dispatch);
  }, []);

  const handleChange = (e, field) =>
    setLoginData((prevState) => ({
      ...prevState,
      [field]: e.target?.files?.length ? e.target.files[0] : e.target.value,
    }));

  return (
    <Dropdown id={"dropdown"}>
      <Dropdown.Toggle variant="light">{state.currentUser?.nome || 'Login'}</Dropdown.Toggle>
      <Dropdown.Menu align="end">
        {state?.currentUser ? (
          <Container>
            {["email", "nome", "tipo"].map((ele) => (
              <p key={'user-' + ele}>{ele + ": " + state.currentUser[ele]}</p>
            ))}
            <Button
              label="Sair"
              loadingLabel="Saindo"
              loading={false}
              variant="primary"
              type="submit"
              form="login-form"
              onClick={() => {}}
            />
          </Container>
        ) : (
          <Container>
            <Form onSubmit={handleSubmit} id="login-form">
              <Form.Group className="mb-3" controlId="loginForm">
                <br />
                <Form.Control
                  type="text"
                  required
                  placeholder="email"
                  value={loginData?.email}
                  onChange={(e) => handleChange(e, "email")}
                />
                <br />
                <Form.Control
                  type="password"
                  required
                  placeholder="senha"
                  value={loginData?.password}
                  onChange={(e) => handleChange(e, "password")}
                />
                <br />
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
          </Container>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
