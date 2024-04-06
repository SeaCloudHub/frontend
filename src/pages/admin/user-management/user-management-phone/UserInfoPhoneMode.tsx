type UserInfoPhoneModeProps = {
  userId?: string;
  name?: string;
  avatar?: string;
  usedMemory: number | 0;
  lastAccess?: string;
};

const UserInfoPhoneMode = ({ userId, name, usedMemory, lastAccess, avatar }: UserInfoPhoneModeProps) => {
  return (
    <>
      {/* <div className='w-full border-y border-b-2 border-t-2 border-[#063768] p-2'>
        <img src={avatar} className='h-[50px] rounded-full object-contain' />
        {userInfoColumns.map((item, index) => (
          <UserInfoItem
            key={index}
            title={item.label}
            content={item.id === 'userId' ? userId : item.id === 'name' ? name : item.id === 'lastAccess' ? lastAccess : ''}
          />
        ))}
        <div className='flex justify-between text-[12px]'>
          <p className='statement-upper-medium w-2/6 truncate text-gray-500'>Used memory</p>
          <div className='flex w-3/6 justify-end '>
            <LinearChartBar total={100} value={usedMemory} color='blue' width='70%' />
          </div>
        </div>
        <div className='flex flex-wrap space-x-2'>
          <ButtonOutline title='Detail' size={20} color='Blue' />
          <ButtonOutline title='Delete' size={20} color='red' />
          <ButtonOutline title='Block' size={20} color='black' />
        </div>
      </div> */}
    </>
  );
};
type UserInfoItemProps = {
  title?: string;
  content?: string;
};
export const UserInfoItem = ({ title, content }: UserInfoItemProps) => {
  return (
    <div className='flex justify-between text-[12px]'>
      <p className='statement-upper-medium w-2/6 truncate text-gray-500'>{title}</p>
      <p className='statement-medium flex w-3/6 justify-end truncate'>{content}</p>
    </div>
  );
};
export default UserInfoPhoneMode;
