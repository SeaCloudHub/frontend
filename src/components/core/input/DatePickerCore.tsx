'use client';
import { ConfigProvider, DatePicker } from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import './DatePickerCore.css';

type DatePickerCoreProps = {
  label?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  date?: dayjs.Dayjs;
  onChange?: (data: any, dateString: any) => void;
};

const DatePickerCore = ({ className, name, disabled, label, date, onChange }: DatePickerCoreProps) => {
  return (
    <ConfigProvider locale={locale}>
      <div className={`${label && `flex items-center gap-3`}`}>
        {label}
        <DatePicker
          defaultValue={date}
          name={name}
          showToday={false}
          className={`h-[40px] customDate ${className}`}
          popupClassName='customDate'
          disabled={disabled}
          onChange={onChange}
          value={date}
        // format={DATE_FORMAT.DATE_TIME_SECOND.ISO8601}
        />
      </div>
    </ConfigProvider>
  );
};

export default DatePickerCore;
