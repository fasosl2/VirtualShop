import { PillButton } from "./styles";
import type { IButton } from "../Button/type";


export const FloatingPillButton: IButton = ({
  label,
  ...props
}) => {
  return (
    <PillButton
      pill="true"
      variant="primary"
      label={label}
      {...props}
    />
  );
};
