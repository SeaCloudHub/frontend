const files: { type: string; color: string; width: number }[] = [
  {
    type: 'PDF',
    color: '#033BF1',
    width: 200,
  },
  {
    type: 'Images',
    color: '#33cc33',
    width: 10,
  },
  {
    type: 'Document',
    color: '#f12345',
    width: 5,
  },
  {
    type: 'Presentations',
    color: '#ff6600',
    width: 5,
  },
  {
    type: 'Another',
    color: '#928B88',
    width: 5,
  },
];
const Statistics = () => {
  return (
    <div>
      <div className='flex items-center space-x-3'>
        <p className='h3'>912.2 MB</p>
        <p className='stat statement-upper-medium text-gray-500'>of 15 GB used</p>
      </div>
      <div className='mt-2 flex h-2 w-full items-center rounded-full bg-slate-300'>
        {files.map((file, index) => (
          <div
            key={index}
            className={`bg-[${file.color}] z-${10 - index} -ml-${index === 0 ? '0' : '4'} h-2 w-[${100}px] rounded-full border-2 bg-${file.color} p-1 hover:z-20 hover:border-2 hover:p-1.5`}></div>
        ))}
      </div>
      <div className='flex flex-wrap space-x-3'>
        {files.map((item, index) => (
          <div className='statement-upper-medium  flex items-center space-x-2 '>
            <p className={`h-2 w-2 rounded-full bg-[${item.color}]`}></p>
            <p>{item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
