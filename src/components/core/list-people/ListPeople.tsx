import { getEntryMetadata } from '@/apis/drive/drive.api';
import { convertUserFileRoleInf } from '@/apis/user/storage/storage.service';
import { List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import PeopleItem from './PeopleItem';
import { useUpdateAccessMutation } from '@/hooks/drive.hooks';

type PeopleList = {
  user_id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'Viewer' | 'Editor' | 'Owner';
};

type ListPeopleProps = {
  height?: string;
  fileId?: string;
};
const renderSkeleton = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <ListItem key={index}>
      <ListItemAvatar>
        <Skeleton variant='circular' width={40} height={40} />
      </ListItemAvatar>
      <ListItemText primary={<Skeleton variant='text' width='80%' />} secondary={<Skeleton variant='text' width='60%' />} />
      <Skeleton variant='rectangular' width={120} height={40} />
    </ListItem>
  ));
};

const ListPeople: React.FC<ListPeopleProps> = ({ fileId, height }) => {
  const [peopleList, setPeopleList] = useState<PeopleList[]>([]);
  const updateAccessMutation = useUpdateAccessMutation();

  const { data, error, isFetching } = useQuery({
    queryKey: ['get-file-metadata-for-share', fileId],
    queryFn: () => {
      if (fileId) {
        return getEntryMetadata({ id: fileId });
      }
      return Promise.resolve(null);
    },
    staleTime: 0,
    select: (data) => {
      return convertUserFileRoleInf(data.data.users);
    },
  });

  useEffect(() => {
    if (data) {
      setPeopleList(data as PeopleList[]);
    }
  }, [data]);

  return (
    <>
      <List sx={{ height: height || '200px' }} className='overflow-y-auto'>
        {isFetching && !data
          ? renderSkeleton()
          : peopleList.map((item, index) => (
              <PeopleItem
                key={index}
                user_id={item.user_id}
                name={item.name}
                email={item.email}
                avatar={item.avatar}
                value={item.role}
                setValue={(value: string) => {
                  updateAccessMutation.mutate({
                    id: fileId,
                    access: [{
                      user_id: item.user_id,
                      role: value.toLocaleLowerCase() as 'viewer' | 'editor',
                    }]
                  }, {
                    onSuccess: () => {
                      const newState = [...peopleList];
                      newState[index] = { ...newState[index], role: value as 'Viewer' | 'Editor' };
                      setPeopleList(newState);
                    },
                  });
                }}
              />
            ))}
      </List>
    </>
  );
};

export default ListPeople;
