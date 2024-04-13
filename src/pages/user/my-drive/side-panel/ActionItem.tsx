import { Avatar, Tooltip } from '@mui/material';
import React from 'react';
import { DataSidePanelAction } from './SidePanelAction';
import { Icon } from '@iconify/react/dist/iconify.js';
import fileIcons from '@/components/core/file-card/fileicon.constant';
import FileChip from './FileChip';

export type ActionItemProps = {
  time: Date,
  data: {
    action: string;
    timeAction: Date;
    actor: {name: string; avatar: string};
    root?: DataSidePanelAction;
    entry: DataSidePanelAction[];
  }[];
};

const ActionItem: React.FC<ActionItemProps> = ({
  time, data
}) => {

  return (
    data.map((action, index) => (
      <div className='flex gap-5' key={index}>
        <Avatar src={action.actor.avatar} sx={{width: '30px', height: '30px'}}/>
        <div>
          <div className='font-semibold text-lg'>{action.actor.name} have {action.action} {data.length>1 ? `${data.length} items`: 'an item'}</div>
          <div className='text-sm'>{action.timeAction.toISOString()}</div>
          {action.root &&
            <div className='flex items-center gap-2 border px-2 py-1 mt-1 border-gray-500 rounded-lg w-fit cursor-pointer hover:bg-gray-200'>
              <Icon icon='mdi:folder' className='w-6 h-6 text-gray-500' />
              <Tooltip title={action.root.title} className='font-semibold'>
                <div className='line-clamp-1 max-w-40'>{action.root.title}</div>
              </Tooltip>
            </div>
          }
          {action.entry.map((entry, ind) => (
            <div className={`${action.root?'ml-5':''} flex gap-2 items-center my-2 w-full`} key={ind}>
              {action.root && <span className='border-l border-b border-gray-300 w-4 h-4'></span>}
              <FileChip title={entry.title}/>
            </div>
          ))}
        </div>
      </div>
    ))
  );
};

export default ActionItem;