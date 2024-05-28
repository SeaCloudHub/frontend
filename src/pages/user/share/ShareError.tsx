type ShareErrorProps = {
  message?: string;
};
const ShareError = ({ message }: ShareErrorProps) => {
  return (
    <div className='flex h-[calc(100vh-4rem)] items-center justify-center  px-2 py-2'>
      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-start justify-center space-y-2'>
          <p>{message}</p>
        </div>
        <img src={(import.meta.env.BASE_URL + 'robot.png') as string} />
      </div>
    </div>
  );
};

export default ShareError;
