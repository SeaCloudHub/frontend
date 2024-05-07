import dayjs from 'dayjs';
import IconifyIcon from '../../../components/core/Icon/IConCore';
import ButtonContainer from '../../../components/core/button/ButtonContainer';
import ButtonOutline from '../../../components/core/button/ButtonOutline';
import DatePickerCore from '../../../components/core/input/DatePickerCore';
import TextInputAdornment from '../../../components/core/input/TextInputAdornment';
import TextInputCore from '../../../components/core/input/TextInputCore';
const UserManagementFilter = () => {
  return (
    <div className='rounded-xl  p-2 dark:bg-black'>
      <div className='flex flex-wrap items-center '>
        <div className='mx-2 '>
          <TextInputCore
            onChange={(data?: string) => {
              console.log(data);
            }}
            label='User ID'
            labelDirection='vertical'
            placeholder='User ID'
          />
        </div>
        <div className='mx-2 '>
          <TextInputCore
            onChange={(data?: string) => {
              console.log(data);
            }}
            label='Name'
            labelDirection='vertical'
            placeholder='Name'
          />
        </div>
        <div className='mx-2 mt-4 '>
          <div>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center '>
                <DatePickerCore
                  label='From'
                  onChange={(newDate) => {
                    console.log(newDate);
                  }}
                  defaultValue={dayjs()}
                />
              </div>
              <div className='flex items-center '>
                <DatePickerCore
                  label='To'
                  onChange={(newDate) => {
                    console.log(newDate);
                  }}
                  defaultValue={dayjs()}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mx-2 mt-3 flex-grow'>
          <div title='Memory used'>
            <div className='flex items-center'>
              <TextInputAdornment
                onChange={(data?: string) => {
                  console.log(data);
                }}
                labelDirection='horizontal'
                sx={{ maxWidth: 100 }}
                placeholder='0'
                label='From'
                type='number'
                adornmentValue='%'
                position={'end'}
              />
              <TextInputAdornment
                onChange={(data?: string) => {
                  console.log(data);
                }}
                labelDirection='horizontal'
                sx={{ maxWidth: 100 }}
                placeholder='100'
                label='To'
                type='number'
                adornmentValue='%'
                position={'end'}
              />
            </div>
          </div>
        </div>
        <div className=' space-x-2'>
          <ButtonContainer background='#02342' icon={<IconifyIcon icon={'bi:search'} />} title='Search' />
          <ButtonOutline color='blue' title='Clear' />
        </div>
      </div>
    </div>
  );
};

export default UserManagementFilter;
