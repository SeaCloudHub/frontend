type SectionBorderProps = {
  title?: string;
  children: React.ReactNode;
};
const SectionBorder = ({ title, children }: SectionBorderProps) => {
  return (
    <div className='relative  flex w-full  space-y-3  border-2 p-2'>
      <p className='statement-bold absolute -top-3.5 left-6  z-10 bg-white px-2'>{title}</p>
      {children}
    </div>
  );
};

export default SectionBorder;
