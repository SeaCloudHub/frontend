import { SelectChangeEvent } from '@mui/material';
import SelectCore from '../../components/core/drop-down/SelectCore';
import React from 'react';
import { loginFooter } from '../../utils/constants/login-footer.constant';
import AuthLink from './auth-link/AuthLink';

const items = [
  { label: 'About', value: 'en' },
  { label: 'Vietnamese', value: 'vi' },
];

const AuthFooter = () => {
  return (
    <>
      {/* <SelectCore currentValue={currentValue} items={items} handleChange={handleChange} /> */}
      <div className='w-full flex gap-4 justify-end mt-2'>
        {loginFooter.map((item, index) => (
          <AuthLink key={index} link={item.path} className='text-black'>
            {item.label}
          </AuthLink>
        ))}
      </div>
    </>
  );
};

export default AuthFooter;
