import { Avatar, LinearProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ActionItem from './ActionItem';
import { LogItem } from '@/apis/drive/drive.response';
import { formatDate } from '@/utils/function/formatDate.function';
import { useActivityLog } from '@/hooks/drive.hooks';
import { useStorageStore } from '@/store/storage/storage.store';
import { useCursor, useCursorActivity } from '@/store/my-drive/myDrive.store';



const SidePanelAction = () => {
  const {data, isLoading} = useActivityLog();
  const {nextCursorActivity} = useCursorActivity();

  return (
    isLoading && !nextCursorActivity  ? (
      <LinearProgress className=' translate-y-1' />
    ) :
    <div className='px-2 h-full overflow-hidden overscroll-y-auto overflow-x-hidden' >
      {data.map((item, index) => {
        return (
          <div key={index} className='flex flex-col relative'>
            <div className={`sticky top-0 py-3 text-sm font-semibold bg-white dark:bg-dashboard-dark z-10`}>{item.time}</div>
            <ActionItem key={index} time={item.time} data={item.data} />
          </div>
        )}
      )}
    </div>
  );
};

export default SidePanelAction;
