import { Button } from "../Button";
import { PillButton } from "./styles";

export const FloatingPillButton = ({ label, ...props }) => {
  return (
    <PillButton
      pill="true"
      bg="primary"
      label={label}
      {...props}
    />
  );
};
