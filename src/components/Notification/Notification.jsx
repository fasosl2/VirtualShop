import { createPortal  } from "react-dom";
import {Alert} from "react-bootstrap";

export const Notification = ({ variant = "success", message, onClose }) => {
  return createPortal(
    <Alert variant={variant} 
    onClose={onClose}
        style={{
        width:'20%',
        position:'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom:'0'

    }}
    dismissible>
      {message}
    </Alert>,
    document.body
  );
};
