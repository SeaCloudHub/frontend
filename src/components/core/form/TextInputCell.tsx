import TextInputCore from '@/components/core/input/TextInputCore';
import InputCell from './InputCell';

type TextInputCell = {
  className?: string;
  style?: string;
  errorMessage?: string;
  type?: string;
  [others: string]: any;
  value?: any;
};

const TextInputCell = ({ type = 'text', className, style, errorMessage, value, ...others }: TextInputCell) => {
  return (
    <InputCell className={`${className} ${errorMessage ? 'py-4' : ''}`}>
      <TextInputCore {...others} value={value} className={`h-[40px] text-base ${style}`} type={type} />
      {errorMessage && <p className='text-red-500 mt-1 text-sm font-semibold'>{errorMessage}</p>}
    </InputCell>
  );
};

export default TextInputCell;
