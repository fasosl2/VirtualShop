import { Card } from "./styles";

export const Frame = ({url, image, aspect, ...props}) => {
  return (
    <Card className="bg-dark text-white" aspect={aspect} image={image} url={url} {...props}>
      {props.children}
    </Card>
  );
}