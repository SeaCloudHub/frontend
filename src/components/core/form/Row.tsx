import React from 'react';

type RowProps = {
  children: React.ReactNode;
  isLast?: boolean;
  height?: string;
  className?: string;
};

const Row = ({ children, isLast, height, className }: RowProps) => {
  return (
    <div className={`flex ${className} ${!height ? 'h-auto' : height} ${!isLast && 'border-b border-[#838383]'}`}>{children}</div>
  );
};

export default Row;
