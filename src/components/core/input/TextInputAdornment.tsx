import { InputAdornment, Typography } from '@mui/material';
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
        endAdornment: position == 'end' && (
          <InputAdornment position='end'>
            <Typography sx={{ '.dark &': { color: 'white' } }}>{adornmentValue}</Typography>
          </InputAdornment>
        ),
        startAdornment: position == 'start' && (
          <InputAdornment position='start'>
            <Typography sx={{ '.dark &': { color: 'white' } }}>{adornmentValue}</Typography>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextInputAdornment;
