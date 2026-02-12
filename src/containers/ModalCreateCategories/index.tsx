import { useRef, useState } from "react";
import { Modal } from "../../components/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import {
  closeModalsAction,
} from "../../actions/modalsActions";
import { saveCategoriesAction } from "../../actions/categoriesActions";
import type { IModal } from "../../components/Modal/type";
import type { ICategory } from "../../interfaces/Category";

export const ModalCreateCategories = ({ open } : IModal) => {
  const { dispatch } = useAppContext();
  const initialCategory = useRef<ICategory>({ 
    name: "", 
    description: "" 
  })
  const [categoryData, setCategoryData] = useState<ICategory>(initialCategory.current);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await saveCategoriesAction(dispatch, categoryData);
    dispatch(closeModalsAction());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
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
