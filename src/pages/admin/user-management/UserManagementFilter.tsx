import { InputAdornment, InputLabel, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import IconifyIcon from '../../../components/core/Icon/IConCore';
import ButtonContainer from '../../../components/core/button/ButtonContainer';
import ButtonOutline from '../../../components/core/button/ButtonOutline';
import SectionBorder from '../../../components/core/section-boder/SectionBoder';
const UserManagementFilter = () => {
  const handle = (newDate: dayjs.Dayjs) => {
    console.log(newDate);
  };
  return (
    <SectionBorder title='Filter'>
      <div className='flex flex-wrap items-center '>
        <div className='mx-2 '>
          <InputLabel sx={{ fontWeight: 'bold' }} htmlFor='name'>
            User ID
          </InputLabel>
          <TextField id='name' placeholder='User ID'></TextField>
        </div>
        <div className='mx-2 '>
          <InputLabel sx={{ fontWeight: 'bold' }} htmlFor='name'>
            Name
          </InputLabel>
          <TextField id='name' placeholder='Name'></TextField>
        </div>
        <div className='mx-2 mt-4 '>
          <SectionBorder title='Last Access'>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center '>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker onChange={handle} label='From' format='YYYY/MM/DD' defaultValue={dayjs('2022-04-17')} />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className='flex items-center '>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label='To' format='YYYY/MM/DD' defaultValue={dayjs('2022-04-17')} />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </SectionBorder>
        </div>
        <div className='mx-2 mt-3'>
          <SectionBorder title='Memory used'>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center space-x-1'>
                <InputLabel sx={{ fontWeight: 'bold' }} htmlFor='name'>
                  From
                </InputLabel>
                <TextField
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>%</InputAdornment>,
                  }}
                  sx={{ maxWidth: 100 }}
                  id='name'
                  placeholder='0'></TextField>
              </div>
              <div className='flex items-center space-x-1'>
                <InputLabel sx={{ fontWeight: 'bold' }} htmlFor='name'>
                  To
                </InputLabel>
                <TextField
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>%</InputAdornment>,
                  }}
                  sx={{ maxWidth: 100 }}
                  id='name'
                  placeholder='100'></TextField>
              </div>
            </div>
          </SectionBorder>
        </div>
        <div className=' space-x-2'>
          <ButtonContainer background='#02342' icon={<IconifyIcon icon={'bi:search'} />} title='Search' />
          <ButtonOutline color='blue' title='Clear' />
        </div>
      </div>
    </SectionBorder>
  );
};

export default UserManagementFilter;
