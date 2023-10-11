import { FunctionComponent, ReactNode } from "react";
import './Chip.scss';

interface ChipProps {
  children: ReactNode;
}

const Chip: FunctionComponent<ChipProps> = ({ children }) => {
  return <div className="chip-container">{children}</div>;
};

export default Chip;
