import { StyledCard } from "./styles";
import type { IFrame } from "./type";

export const Frame = ({url, image, aspect, ...props} : IFrame) => {
  return (
    <StyledCard className="bg-dark text-white" aspect={aspect} image={image} url={url} {...props}>
      {props.children}
    </StyledCard>
  );
}