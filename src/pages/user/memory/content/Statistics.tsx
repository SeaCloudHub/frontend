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
    color: 'bg-[#ff6600]',
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
        <div
          className={`z-10 h-2  w-[100px] rounded-full border-2 bg-[#033BF1]  p-1 hover:z-20 hover:border-2 hover:p-1.5`}></div>
        <div
          className={`z-9 -ml-4 h-2 w-[100px] rounded-full border-2 bg-[#33cc33]  p-1 hover:z-20 hover:border-2 hover:p-1.5`}></div>
        <div
          className={`z-8 -ml-4 h-2 w-[100px] rounded-full border-2 bg-[#f12345]  p-1 hover:z-20 hover:border-2 hover:p-1.5`}></div>
        <div
          className={`z-7 -ml-4 h-2 w-[100px] rounded-full border-2 bg-[#ff6600]  p-1 hover:z-20 hover:border-2 hover:p-1.5`}></div>
        <div
          className={`z-6 -ml-4 h-2 w-[100px] rounded-full border-2 bg-[#928B88]  p-1 hover:z-20 hover:border-2 hover:p-1.5`}></div>
      </div>
      <div className='flex flex-wrap space-x-3'>
        <div className='statement-upper-medium  flex items-center space-x-2 '>
          <p className={`h-2 w-2 rounded-full bg-[#033BF1]  `}></p>
          <p>PDF</p>
        </div>
        <div className='statement-upper-medium  flex items-center space-x-2 '>
          <p className={`h-2 w-2 rounded-full bg-[#33cc33]  `}></p>
          <p>Images</p>
        </div>
        <div className='statement-upper-medium  flex items-center space-x-2 '>
          <p className={`h-2 w-2 rounded-full bg-[#f12345]`}></p>
          <p>Document</p>
        </div>
        <div className='statement-upper-medium  flex items-center space-x-2 '>
          <p className={`h-2 w-2 rounded-full bg-[#ff6600]`}></p>
          <p>Presentations</p>
        </div>
        <div className='statement-upper-medium  flex items-center space-x-2 '>
          <p className={`h-2 w-2 rounded-full bg-[#928B88] `}></p>
          <p>Another</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
