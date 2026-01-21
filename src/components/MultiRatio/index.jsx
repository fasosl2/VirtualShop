import { Button } from "../Button";

export const MultiRatio = ({ controls, elements, onClick, ...props }) => {
  return (
    <div>
      {controls.map((element, index) => (
        <Button
          label={element.label}
          key={index}
          variant={elements[index] ? 'secondary' : 'primary'}
          onClick={() => onClick(index)
          }
        />
      ))}
    </div>
  );
};
