import { Button } from "../Button";
import type { IMultiRatio } from "./type";


export const MultiRatio = ({
  controls,
  elements,
  onClick,
  //...props
}: IMultiRatio) => {
  return (
    <div>
      {controls.map((control, index) => (
        <Button
          label={control.label}
          key={index}
          variant={elements[index] ? "secondary" : "primary"}
          onClick={() => onClick(index)} 
          loading={undefined} 
          loadingLabel={undefined}        
        />
      ))}
    </div>
  );
};
