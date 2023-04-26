import { Button } from "../../components/Button/Button";

export const FloatingPillButton = ({ label, ...props }) => {
  return (
    <Button
      pill="true"
      bg="primary"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        fontSize: "300%",
        zIndex: 100,
        paddingBottom: "10px",
        paddingTop: "0px",
      }}
      label={label}
      {...props}
    >
    </Button>
  );
};
