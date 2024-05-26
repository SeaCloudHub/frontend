import { Avatar, LinearProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ActionItem from './ActionItem';
import { LogItem } from '@/apis/drive/drive.response';
import { formatDate } from '@/utils/function/formatDate.function';
import { useActivityLog } from '@/hooks/drive.hooks';
import { useStorageStore } from '@/store/storage/storage.store';
import { useCursor, useCursorActivity } from '@/store/my-drive/myDrive.store';

const SidePanelAction = () => {
  const { data, isLoading } = useActivityLog();
  const { nextCursorActivity } = useCursorActivity();

  return isLoading && !nextCursorActivity ? (
    <LinearProgress className=' translate-y-1' />
  ) : (
    <div className='h-full overflow-hidden overflow-x-hidden overscroll-y-auto px-2'>
      {data.map((item, index) => {
        return (
          <div key={index} className='relative flex flex-col'>
            <div className={`sticky top-0 z-10 bg-white py-3 text-sm font-semibold dark:bg-dashboard-dark`}>{item.time}</div>
            <ActionItem key={index} time={item.time} data={item.data} />
          </div>
        );
      })}
    </div>
  );
};

export default SidePanelAction;
