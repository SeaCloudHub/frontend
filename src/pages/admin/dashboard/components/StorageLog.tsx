import { StorageLogDto } from '@/utils/types/strorage-log.type';
import AccordionCore from '../../../../components/core/accordion/AccordionCore';

type StorageLogProps = {
  logs?: StorageLogDto[];
  isFetching?: boolean;
  moreClick?: () => void;
};

const actionColors = {
  DELETE: 'text-red-600',
  CREATE: 'text-green-600',
  RENAME: 'text-yellow-600',
  OPEN: 'text-blue-600',
  STAR: 'text-yellow-500',
  MOVE: 'text-purple-500',
  SHARE: 'text-blue-400',
  UPDATE: 'text-orange-600',
};
const StorageLog = ({ logs, isFetching, moreClick }: StorageLogProps) => {
  const getActionColorClass = (action: string) => {
    return actionColors[action] || 'black';
  };
  return (
    <AccordionCore title='Storage Log'>
      <div className='max-h-[400px] overflow-y-auto  bg-content-bg px-2 text-sm dark:bg-content-bg-dark dark:text-content-bg'>
        {logs &&
          logs.map((log, index) => (
            <div className='flex space-x-2 truncate' key={index}>
              <p className=' italic '>{log.date}</p>
              <p className=' font-bold'>{log.username}</p>
              <p className={`font-bold ${getActionColorClass(log.action)}  `}>{`[${log.action}]`}</p>
              <p className='truncate'>{log.fileName}</p>
            </div>
          ))}
      </div>
      <p
        onClick={() => {
          moreClick();
        }}
        className='  statement-bold cursor-pointer bg-content-bg px-2 text-sm italic underline dark:bg-content-bg-dark dark:text-content-bg'>
        See more
      </p>
    </AccordionCore>
  );
};

export default StorageLog;
