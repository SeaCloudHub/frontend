import React from 'react';

type LabelCoreProps = {
  title: string;
  className?: string;
  isRequired?: boolean;
  width?: string;
};

const LabelCore = ({ title, className, isRequired, width }: LabelCoreProps) => {
  return (
    <p className={`py-[19px] pl-10 ${width ? width : 'w-[20%]'} bg-[#f0f0f7] ${className}`}>
      {title} {isRequired ? <span className='ml-1 text-[#ff003e]'>*</span> : <></>}
    </p>
  );
};

export default LabelCore;
