import { SelectChangeEvent } from '@mui/material';
import SelectCore from '../../components/core/drop-down/SelectCore';
import React from 'react';
import { loginFooter } from '../../utils/constants/login-footer.constant';
import AuthLink from './auth-link/AuthLink';

type AuthFooterProps = {
  currentValue: string;
  items: string[];
  handleChange: (event: SelectChangeEvent) => void;
};

const AuthFooter: React.FC<AuthFooterProps> = ({ currentValue, items, handleChange }) => {
  return (
    <div className='mx-10 mt-2 flex justify-between'>
      <SelectCore currentValue={currentValue} items={items} handleChange={handleChange} />
      <div className='flex gap-4'>
        {loginFooter.map((item, index) => (
          <AuthLink key={index} link={item.path} className='text-black'>
            {item.label}
          </AuthLink>
        ))}
      </div>
    </div>
  );
};

export default AuthFooter;
