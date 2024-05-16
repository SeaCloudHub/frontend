import { getStorage } from '@/apis/drive/drive.api';
import { classNames } from '@/components/core/drop-down/Dropdown';
import { useQuery } from '@tanstack/react-query';

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
  const { data } = useQuery({
    queryKey: ['user-storage'],
    queryFn: () => getStorage(),
    select: (data) => {
      const types = [
        { title: 'Text', value: data.data.text, color: '#033BF1' },
        { title: 'Document', value: data.data.document, color: '#33cc33' },
        { title: 'PDF', value: data.data.pdf, color: '#f12345' },
        { title: 'Json', value: data.data.json, color: '#ff6600' },
        { title: 'Image', value: data.data.image, color: '#8b9474' },
        { title: 'Video', value: data.data.video, color: '#6cae75' },
        { title: 'Audio', value: data.data.audio, color: '#8bbd8b' },
        { title: 'Archive', value: data.data.archive, color: '#c1cc99' },
        { title: 'Other', value: data.data.other, color: '#928B88' },
      ];
      types.sort((a, b) => b.value - a.value);
      return { types, capacity: data.data.capacity };
    },
  });

  return (
    <div>
      <div className='flex items-center space-x-3'>
        <p className='h3'>912.2 MB</p>
        <p className='stat statement-upper-medium text-gray-500'>of 15 GB used</p>
      </div>
      <div className='mt-2 flex h-2 w-full items-center rounded-full bg-slate-300'>
        {/* <div
          className={classNames(
            `z-10 h-2 rounded-full border-2 bg-[#033BF1]  p-1 hover:z-20 hover:border-2 hover:p-1.5`,
            `w-[${a}]`,
          )}></div>
        <div
          className={`z-9 -ml-4 h-2 w-[100px] rounded-full border-2 bg-[#33cc33]  p-1 hover:z-20 hover:border-2 hover:p-1.5`}></div>
        <div
          className={`z-8 -ml-4 h-2 w-[100px] rounded-full border-2 bg-[#f12345]  p-1 hover:z-20 hover:border-2 hover:p-1.5`}></div>
        <div
          className={`z-7 -ml-4 h-2 w-[100px] rounded-full border-2 bg-[#ff6600]  p-1 hover:z-20 hover:border-2 hover:p-1.5`}></div>
        <div
          className={`z-6 -ml-4 h-2 w-[100px] rounded-full border-2 bg-[#928B88]  p-1 hover:z-20 hover:border-2 hover:p-1.5`}></div> */}
        {data &&
          data.types.map((type) => (
            <div
              key={type.title}
              className={classNames(
                `h-2 rounded-full border-2 p-1 hover:z-20 hover:border-2 hover:p-1.5`,
                `w-[${(type.value / data.capacity) * 100}%]`,
                `bg-[${type.color}]`,
              )}></div>
          ))}
      </div>
      <div className='flex flex-wrap space-x-3'>
        {data &&
          data.types.map((type) => (
            <div key={type.title} className='flex items-center space-x-2'>
              <div className='h-2 w-2 rounded-full' style={{ backgroundColor: type.color }}></div>
              <p className='stat statement-upper-medium'>{type.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Statistics;
