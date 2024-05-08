type FilerButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

export const FilerButton: React.FC<FilerButtonProps> = ({ icon, label, onClick }) => {
  return (
    <div className='flex h-[30px] items-center border border-[#d1d1d1] px-[10px] py-[5px] hover:bg-[#e6e6e6]' onClick={onClick}>
      {icon}
      {label}
    </div>
  );
};
