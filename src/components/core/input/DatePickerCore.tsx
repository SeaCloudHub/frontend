'use client';
import { SxProps, Theme } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';

type DatePickerCoreProps = {
  label?: string;
  name?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  defaultValue?: dayjs.Dayjs;
  onChange?: (date?: string) => void;
  locate?: string;
};

const DatePickerCore = ({ name, disabled, label, defaultValue, sx, onChange, locate = 'en' }: DatePickerCoreProps) => {
  const onConvertvalue = (newDate: Dayjs | null) => onChange?.(newDate?.toDate()?.toLocaleDateString(locate));
  return (
    <LocalizationProvider adapterLocale={locate} dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker disabled={disabled} sx={sx} onChange={onConvertvalue} label={label} defaultValue={defaultValue} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerCore;
