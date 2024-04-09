import { List } from '@mui/material';
import React from 'react';
import PeopleItem, { PeopleItemProps } from './PeopleItem';

type PeopleList = {
  name: string;
  email: string;
  avatar?: string;
};

type ListPeopleProps = {
  items: PeopleList[];
  state: ('Viewer' | 'Editor' | 'Owner')[];
  setState: (state: ('Viewer' | 'Editor' | 'Owner')[]) => void;
  height?: string;
};

const ListPeople: React.FC<ListPeopleProps> = ({ items, state, setState, height }) => {
  return (
    <List sx={{ bgcolor: 'background.paper', height: height||'200px'}} className='overflow-y-auto'>
      {items.map((item, index) => (
        <PeopleItem key={index}
          name={item.name}
          email={item.email}
          avatar={item.avatar}
          value={state[index]}
          setValue={(value: string) => {
            const newState = [...state];
            newState[index] = value as 'Viewer' | 'Editor' | 'Owner';
            setState(newState);
          }} />
      ))}
    </List>

  );
};

export default ListPeople;