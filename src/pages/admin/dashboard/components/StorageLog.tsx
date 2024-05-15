import { StorageLogDto } from '@/utils/types/strorage-log.type';
import AccordionCore from '../../../../components/core/accordion/AccordionCore';

type StorageLogProps = {
  logs?: StorageLogDto[];
  isFetching?: boolean;
  moreClick?: () => void;
};

const actionColors = {
  DELETE: 'text-red-600',
  ADD: 'text-blue-600',
  RENAME: 'text-purple-500',
  OPEN: 'text-green-600',
  STAR:'text-pink-600'
};

const StorageLog = ({ logs, isFetching, moreClick }: StorageLogProps) => {
  const getActionColorClass = (action: string) => {
    return actionColors[action] || 'black';
  };
  return (
    <AccordionCore title='Storage Log'>
      <div className='max-h-[400px] overflow-y-auto px-2 text-sm'>
        {logs &&
          logs.map((log, index) => (
            <div className='flex space-x-2 truncate' key={index}>
              <p className=' italic '>{log.date}</p>
              <p className=' font-bold'>{log.username}</p>
              <p className={`${getActionColorClass(log.action)}  `}>{`[${log.action}]`}</p>
              <p className='truncate'>{log.fileName}</p>
            </div>
          ))}
      </div>
      <p
        onClick={() => {
          moreClick();
        }}
        className='statement-bold cursor-pointer px-2 italic underline'>
        See more
      </p>
    </AccordionCore>
  );
};

export default StorageLog;
