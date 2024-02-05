import React from 'react';

type LabelCoreProps = {
  title: string;
  className?: string;
  isRequired?: boolean;
  width?: string;
};

const LabelCore = ({ title, className, isRequired, width }: LabelCoreProps) => {
  return (
    <p className={`pl-10 py-[19px] ${width ? width : 'w-[20%]'} bg-[#f0f0f7] ${className}`}>
      {title} {isRequired ? <span className='text-[#ff003e] ml-1'>*</span> : <></>}
    </p>
  );
};

export default LabelCore;
