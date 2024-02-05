import DropdownCore from '@/components/core/input/DropdownCore';
import { DropdownItems } from '@/utils/types/dropdown.type';
import classNames from 'classnames';
import InputCell from './InputCell';

type DropCellProps = {
  className?: string;
  name?: string;
  options: DropdownItems;
  onChange?: (e?: any) => void;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  value?: string;
};

const DropCell = ({ className, options, name, onChange, placeholder, isError, errorMessage, value }: DropCellProps) => {
  return (
    <InputCell className={classNames(className, { 'py-2': errorMessage })}>
      <DropdownCore style='w-full' onChange={onChange} options={options} placeholder={placeholder} value={value} />
      {errorMessage && <p className='text-red-500 mt-1 text-sm font-semibold'>{errorMessage}</p>}
    </InputCell>
  );
};

export default DropCell;
