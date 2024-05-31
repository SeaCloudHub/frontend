import { SelectChangeEvent } from '@mui/material';
import SelectCore from '../../components/core/drop-down/SelectCore';
import React from 'react';
import { loginFooter } from '../../utils/constants/login-footer.constant';
import AuthLink from './auth-link/AuthLink';
import { Link } from 'react-router-dom';

const AuthFooter = () => {
  return (
    <>
      {/* <SelectCore currentValue={currentValue} items={items} handleChange={handleChange} /> */}
      <div className='mt-2 flex w-full justify-end gap-4'>
        {loginFooter.map((item, index) => (
          // <AuthLink key={index} link={item.path} className='text-black'>
          //   {item.label}
          // </AuthLink>
          <Link key={index} target='_blank' to={item.path} className='rounded-xl px-1 text-sm text-black hover:bg-[#ecf2fc]'>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default AuthFooter;
