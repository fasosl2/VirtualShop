import React, { useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";
// import { Button } from "../../components/Button";
import { Container, LoginImage, Form, H6, FormControl, Button, Hr } from "./styles";
import { useAppContext } from "../../storage/AppContext";
import { authUsersAction, loginUsersAction, logoutUsersAction } from "../../actions/userActions";
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    loginUsersAction(dispatch, { ...loginData });
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

  const handleChange = (e, field) =>
    setLoginData((prevState) => ({
      ...prevState,
      [field]: e.target?.files?.length ? e.target.files[0] : e.target.value,
    }));
  
  const propertesMap = [{
    prop: "email",
    name: "e-mail"
  },{
    prop: "name",
    name: "nome"
  },{
    prop: "type",
    name: "tipo"
  }];

  return (
    <Dropdown id={"dropdown"}>
      <Dropdown.Toggle variant="light">{state.currentUser?.name || 'login'}</Dropdown.Toggle>
      <Dropdown.Menu align="end">
        {state?.currentUser ? (
          <Container>
            <LoginImage src={state.currentUser?.image} alt="no image"/>
            {propertesMap.map((ele) => (
              <p key={'user-' + ele.prop}>{ele.name + ": " + state.currentUser[ele.prop]}</p>
            ))}
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
                <label>email</label>
                <FormControl
                  type="text"
                  required
                  placeholder="seuemail@email.com"
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
                <Hr/>
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
