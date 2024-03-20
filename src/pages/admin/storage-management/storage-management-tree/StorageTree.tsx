import IconifyIcon from '../../../../components/core/Icon/IConCore';
import { Box, Typography } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import React from 'react';

export type StorageItem = {
  id: string;
  name: string;
  child?: StorageItem[];
};

type StorageTreeProps = {
  selectedItems: StorageItem[];
  handleSelectedItemsChange: (event: React.SyntheticEvent, ids: string | null) => void;
};

const StorageTree: React.FC<StorageTreeProps> = ({ selectedItems, handleSelectedItemsChange }) => {
  const renderTreeItems = (items: StorageItem[]) =>
    items.map((item) => (
      <TreeItem
        key={item.id}
        nodeId={item.id}
        label={
          <div className='flex items-center'>
            <IconifyIcon
              icon={item.child ? 'bi:folder' : 'octicon:file-24'}
              className={`mr-2 h-4 w-4 ${item.child ? 'text-yellow-600' : 'text-blue-600'}`}
            />
            <span>{item.name}</span>
          </div>
        }
        onSelect={(event) => handleSelectedItemsChange(event, item.id)}
        className='line-clamp-1 overflow-hidden'>
        {item.child && renderTreeItems(item.child)}
      </TreeItem>
    ));

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
      <Typography variant='h6' gutterBottom>
        Storage
      </Typography>
      <SimpleTreeView onSelectedItemsChange={handleSelectedItemsChange}>{renderTreeItems(selectedItems)}</SimpleTreeView>
    </Box>
  );
};

export default StorageTree;
