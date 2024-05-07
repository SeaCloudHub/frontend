import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

type DatePickerCoreProps = {
  label?: string;
  disabled?: boolean;
  defaultValue?: dayjs.Dayjs;
  onChange?: (date?: string) => void;
  locate?: string;
};

const DatePickerCore = ({ disabled, label, defaultValue, onChange, locate = 'en' }: DatePickerCoreProps) => {
  const onConvertvalue = (newDate: Dayjs | null) => onChange?.(newDate?.toDate()?.toLocaleDateString(locate));
  return (
    <LocalizationProvider adapterLocale={locate} dateAdapter={AdapterDayjs}>
      <DatePicker
        disabled={disabled}
        onChange={onConvertvalue}
        label={label}
        defaultValue={defaultValue}
        sx={{
          '.dark &': {
            '& input': {
              color: 'white',
              '&::placeholder': {
                color: 'white',
              },
            },
            backgroundColor: '#031525',
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiIconButton-root': {
              color: 'white !important',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'gray !important',
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerCore;
