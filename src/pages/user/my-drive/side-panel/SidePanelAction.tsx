import { Avatar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ActionItem from './ActionItem';

export type DataSidePanelAction = {
  id: string;
  title: string;
};

type SidePanelActionProps = {
  data: {
    time: Date;
    data: {
      action: string;
      timeAction: Date;
      actor: { name: string; avatar: string };
      root?: DataSidePanelAction;
      entry: DataSidePanelAction[];
    }[];
  }[];
};

const SidePanelAction: React.FC<SidePanelActionProps> = ({ data }) => {
  return (
    <div className='px-2'>
      {data.map((item, index) => (
        <div key={index} className='flex flex-col'>
          <div className={`my-5 text-sm font-semibold`}>{item.time.toDateString()}</div>
          <ActionItem key={index} time={item.time} data={item.data} />
        </div>
      ))}
    </div>
  );
};

export default SidePanelAction;
