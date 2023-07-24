import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Container, LoginImage } from "./styles";
import { useAppContext } from "../../storage/AppContext";
import { authUsersAction, loginUsersAction, logoutUsersAction } from "../../actions/userActions";
import { loginUsersSuccessType } from "../../storage/types";
import { ListGroup } from "../../components/ListGroup/ListGroup";

export const CarContainer = ( ...props ) => {
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

  return (
    <Dropdown id={"dropdown"}>
      <Dropdown.Toggle variant="light">Carrinho</Dropdown.Toggle>
      <Dropdown.Menu align="end">
          <Container>
            <ListGroup
              items={state.chart?.products.map((product) => ({
                key: product.id,
                id: product.id,
                value: product.price || "$0,00",
                title: product.title,
                total: product.count,
                image: product.image
              }))}
              test={true}
              />
          </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};
