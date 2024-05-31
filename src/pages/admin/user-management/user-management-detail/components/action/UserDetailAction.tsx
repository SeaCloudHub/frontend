type UserDetailActionProps = {
  icon?: React.ReactNode;
  title?: string;
  onClick?: () => void;
};
const UserDetailAction = ({ icon, title, onClick }: UserDetailActionProps) => {
  return (
    <div
      onClick={onClick}
      className='flex cursor-pointer items-center justify-start uppercase hover:bg-gray-300 dark:hover:bg-slate-800'>
      <div className={`mx-2 flex items-center object-cover ${icon ? '' : 'invisible'}`}>{icon}</div>
      <p className='statement-upper-medium truncate p-2 uppercase'>{title}</p>
    </div>
  );
};

export default UserDetailAction;
