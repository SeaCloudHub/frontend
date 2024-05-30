import { storageLogToDto } from '@/apis/admin/dashboard/dash-board.service';
import { storageLogApi } from '@/apis/admin/dashboard/dashboard-api';
import { StorageLogDto } from '@/utils/types/strorage-log.type';
import { Box, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
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

const renderSkeleton = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <Box key={index} display='flex' flexDirection='row' alignItems='center' mb={2}>
      <Skeleton variant='text' width={80} height={24} />
      <Skeleton variant='text' width={100} height={24} style={{ marginLeft: '0.5rem' }} />
      <Skeleton variant='text' width={60} height={24} style={{ marginLeft: '0.5rem' }} />
      <Skeleton variant='text' width={140} height={24} style={{ marginLeft: '0.5rem' }} />
    </Box>
  ));
};
const StorageLog = () => {
  const [logs, setLogs] = useState<StorageLogDto[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const getActionColorClass = (action: string) => {
    return actionColors[action] || 'black';
  };

  const fetchLogs = async () => {
    setFetching(true);
    try {
      const response = await storageLogApi({ cursor, limit: 15, userID: '' });
      const newLogs = response.logs.map((item) => storageLogToDto(item));
      setLogs((prevLogs) => [...prevLogs, ...newLogs]);
      setCursor(response.cursor);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setFetching(false);
    }
  };
  useEffect(() => {
    fetchLogs();
  }, []);

  const onMoreClick = () => {
    if (cursor && cursor != '' && !fetching) {
      fetchLogs();
    }
  };

  return (
    <AccordionCore title='Storage Log' className='h-full overflow-y-auto'>
      <div className='h-full overflow-y-auto bg-content-bg px-2 text-xs dark:bg-content-bg-dark dark:text-content-bg'>
        {logs &&
          logs.map((log, index) => (
            <div className='flex space-x-2 truncate' key={index}>
              <p className='italic'>{log.date}</p>
              <p className='font-bold'>{log.username}</p>
              <p className={`font-bold ${getActionColorClass(log.action)}`}>{`[${log.action}]`}</p>
              <p className='truncate'>{log.fileName}</p>
            </div>
          ))}
        {fetching && renderSkeleton()}
      </div>
      {!fetching && cursor != '' && (
        <p
          onClick={() => {
            onMoreClick();
          }}
          className='statement-bold cursor-pointer bg-content-bg px-2 text-sm italic underline dark:bg-content-bg-dark dark:text-content-bg'>
          See more
        </p>
      )}
      {fetching && <img src={(import.meta.env.BASE_URL + 'loader.svg') as string} className='  h-[30px] w-[30px]' />}
    </AccordionCore>
  );
};

export default StorageLog;
