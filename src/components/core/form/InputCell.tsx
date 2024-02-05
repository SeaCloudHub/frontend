import React from 'react';

type InputCellProps = {
  children: React.ReactNode;
  className: string;
};

const InputCell = ({ children, className }: InputCellProps) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className='px-[40px] w-full flex flex-col'>{children}</div>
    </div>
  );
};

export default InputCell;
