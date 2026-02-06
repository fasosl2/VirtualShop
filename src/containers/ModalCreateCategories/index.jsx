import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal";
import { Button, Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import {
  closeModalsAction,
} from "../../actions/modalsActions";
import { saveCategoriesAction } from "../../actions/categoriesActions";

export const ModalCreateCategories = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const initialCategory = useRef({ 
    name: "", 
    description: "" 
  })
  const [categoryData, setCategoryData] = useState(initialCategory.current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveCategoriesAction(dispatch, categoryData);
    dispatch(closeModalsAction());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  return (
    <Modal
      title="Criar Categoria"
      open={open}
      controls={[
        {
          label: "Salvar",
          variant: "secondary",
          type: "submit",
          form: "create-category-form",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="create-category-form">
        <Form.Group className="mb-3" controlId="formCategoryName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategoryDescription">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" name="description" value={categoryData.description} onChange={handleChange} />
        </Form.Group>
      </Form>
    </Modal>
  );
};