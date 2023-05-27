import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, saveChartsAction } from "../../storage/actions";
import { saveChartsInitType, saveChartsSuccessType } from "../../storage/types";

export const ModalCreateChart = ({ open }) => {
    const [chartName,setChartName] = useState('');
    const { state, dispatch } = useAppContext();
    const handleSubmit = (e) =>{
        e.preventDefault();
        saveChartsAction(dispatch,chartName,state.activeProduct)
    }
    useEffect(() => {
      if (state.type === saveChartsSuccessType) {
        dispatch(closeModalsAction());
      }
    }, [state.type,dispatch]);

    const handleChange = (e) => setChartName(e.target.value);
  return (
    <Modal
      title="Criar Pasta"
      open={open}
      controls={[
        {
          label: "Criar e Salvar",
          loadingLabel: "Criando",
          loading: state.type === saveChartsInitType,
          variant: "secondary",
          type: "submit",
          form: "form-criar-pasta",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="form-criar-pasta">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome da pasta</Form.Label>
          <Form.Control type="text" placeholder="Ex: Matemática" value={chartName} onChange={handleChange}/>
        </Form.Group>
      </Form>
    </Modal>
  );
};
