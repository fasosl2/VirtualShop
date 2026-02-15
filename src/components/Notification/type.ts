
import type { AlertProps } from "react-bootstrap";

export interface INotification {
  variant?: string | AlertProps['variant'];
  message: string;
  onClose: () => void;
}
