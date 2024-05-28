import { Avatar, Tooltip } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import fileTypeIcons from '@/utils/constants/file-icons.constant';
import FileChip from './FileChip';
import { FormatDateStrToMMHHDDMMYYYY } from '@/utils/function/formatDate.function';
import { DataSidePanelAction } from '@/apis/drive/drive.response';

export type ActionItemProps = {
  time: string;
  data: {
    action: string;
    timeAction: Date;
    actor: { name: string; avatar: string };
    // root?: DataSidePanelAction;
    // entry: DataSidePanelAction[];
  }[];
};

const ActionItem: React.FC<ActionItemProps> = ({ time, data }) => {
  return data.map((action, index) => (
    <div className={`${index < data.length - 1 ? 'mb-2 border-b border-gray-300 pb-2' : ''} flex gap-5 `} key={index}>
      <Avatar src={action.actor.avatar} sx={{ width: '30px', height: '30px' }} />
      <div>
        <div className='text-sm font-semibold'>
          {action.actor.name} have {action.action} this item
        </div>
        <div className='text-xs'>{FormatDateStrToMMHHDDMMYYYY(action.timeAction.toISOString())}</div>
        {/* {action.root && (
          <div className='mt-1 flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-gray-500 px-2 py-1 hover:bg-gray-200'>
            <Icon icon='mdi:folder' className='h-5 w-5 text-gray-500' />
            <Tooltip title={action.root.title} className='font-semibold'>
              <div className='line-clamp-1 max-w-40 text-sm'>{action.root.title}</div>
            </Tooltip>
          </div>
        )}
        {action.entry.map((entry, ind) => (
          <div className={`${action.root ? 'ml-5' : ''} my-2 flex w-full items-center gap-2`} key={ind}>
            {action.root && <span className='h-4 w-4 border-b border-l border-gray-300'></span>}
            <FileChip title={entry.title} />
          </div>
        ))} */}
      </div>
    </div>
  ));
};

export default ActionItem;
