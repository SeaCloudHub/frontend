type UserDetailActionProps = {
  title?: string;
  onClick?: () => void;
};
const UserDetailAction = ({ title, onClick }: UserDetailActionProps) => {
  return (
    <div
      onClick={onClick}
      className='flex  cursor-pointer items-center justify-start uppercase
    hover:bg-gray-300
    '>
      <p className='statement-upper-medium p-2 uppercase'>{title}</p>
    </div>
  );
};

export default UserDetailAction;
