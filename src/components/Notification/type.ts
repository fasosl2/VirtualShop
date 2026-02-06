
import type { AlertProps } from "react-bootstrap";

export interface INotification {
  variant?: AlertProps['variant']
  message: string;
  onClose: () => void;
}
