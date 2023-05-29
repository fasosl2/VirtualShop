import { Modal as ModalBS} from "react-bootstrap";
import { Button } from "../Button/Button";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, } from "../../actions/modalsActions";

export const Modal = ({title, children, open, onHide, controls = []}) => {

    const { dispatch } = useAppContext();
    const HandleClose = () => {
        onHide && onHide();
        dispatch(closeModalsAction())
    };

  return (
    <ModalBS show={open} onHide={HandleClose}>
        <ModalBS.Header closeButton>
        <ModalBS.Title>{title}</ModalBS.Title>
        </ModalBS.Header>
        <ModalBS.Body>{children}</ModalBS.Body>
        <ModalBS.Footer>
            {
                controls.map((control,index) => (
                
                <Button key={index} 
                {...control}
                />
                    ))
            }
        
        </ModalBS.Footer>
    </ModalBS>
    );
};