import AccordionCore from '../../../../components/core/accordion/AccordionCore';

const StorageLog = () => {
  const logs = [
    { date: '2023-12-23', user: 'Minnas', action: 'Delete', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Add', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Rename', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Delete', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Add', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Rename', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Delete', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Add', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Add', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Rename', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Delete', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Delete', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Add', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Rename', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Delete', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Add', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Add', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Rename', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Delete', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Add', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Rename', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Delete', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Add', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Rename', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Delete', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Add', file: 'storage.pdf' },
    { date: '2023-12-23', user: 'Minnas', action: 'Rename', file: 'storage.pdf' },
  ];
  return (
    <AccordionCore title='Storage Log' className='mb-3 '>
      <div className='max-h-[400px] overflow-y-auto px-2 text-[14px]'>
        {logs.map((item, index) => (
          <div className='flex space-x-2' key={index}>
            <p className='italic'>{item.date}</p>
            <p className='statement-upper-medium'>{item.user}</p>
            <p
              className={`${
                item.action === 'Delete' ? 'text-red-600' : item.action === 'Add' ? 'text-green-600' : 'text-purple-500'
              } statement-upper-medium `}>
              {`[${item.action}]`}
            </p>
            <p className='statement-upper-medium'>{item.file}</p>
          </div>
        ))}
      </div>
      <p className='statement-bold cursor-pointer underline md:text-[11px]'>See more</p>
    </AccordionCore>
  );
};

export default StorageLog;
