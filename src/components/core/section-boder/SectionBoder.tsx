type SectionBorderProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};
const SectionBorder = ({ title, children, className }: SectionBorderProps) => {
  return (
    <div className='relative  w-full flex-col  space-y-3  border-2 p-2'>
      <p className={`${className} e absolute -top-3.5  left-6 z-10 px-2`}>{title}</p>
      {children}
    </div>
  );
};

export default SectionBorder;
