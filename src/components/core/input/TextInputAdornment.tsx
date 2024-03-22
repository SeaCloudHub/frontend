import { InputAdornment } from '@mui/material';
import TextInputCore, { TextInputCoreProps } from './TextInputCore';

type TextInputAdornmentProps = TextInputCoreProps & {
  position: 'start' | 'end';
  adornmentValue?: string;
};
const TextInputAdornment = ({ position, adornmentValue, ...others }: TextInputAdornmentProps) => {
  return (
    <TextInputCore
      {...others}
      inputProps={{
        endAdornment: position == 'end' && <InputAdornment position='end'>{adornmentValue}</InputAdornment>,
        startAdornment: position == 'start' && <InputAdornment position='start'>{adornmentValue}</InputAdornment>,
      }}
    />
  );
};

export default TextInputAdornment;
