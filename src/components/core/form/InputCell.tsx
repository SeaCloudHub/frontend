import React from 'react';

type InputCellProps = {
  children: React.ReactNode;
  className: string;
};

const InputCell = ({ children, className }: InputCellProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className='flex w-full flex-col px-[40px]'>{children}</div>
    </div>
  );
};

export default InputCell;
