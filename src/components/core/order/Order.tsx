import { useState } from 'react';
import ButtonIcon from '../button/ButtonIcon';

type OrderProps = {
  iconDown: string;
  iconUp: string;
  isAscending?: boolean;
  onChange: (isAscending: boolean) => void;
};

const Order = ({ isAscending, onChange, iconDown, iconUp }: OrderProps) => {
  const onClick = () => {
    onChange(!isAscending);
    setASC((prev) => !prev);
  };
  const [ASC, setASC] = useState(isAscending);
  return <ButtonIcon icon={`${ASC ? iconUp : iconDown}`} onClick={onClick} />;
};

export default Order;
