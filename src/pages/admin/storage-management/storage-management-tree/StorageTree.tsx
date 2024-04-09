import IconifyIcon from '../../../../components/core/Icon/IConCore';
import { Box } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import React from 'react';

export type StorageItem = {
  id: string;
  name: string;
  child?: StorageItem[];
};

type StorageTreeProps = {
  selectedItems: StorageItem[];
  handleSelectedItemsChange: (event: React.SyntheticEvent, ids: string[]) => void;
};

const StorageTree: React.FC<StorageTreeProps> = ({ selectedItems, handleSelectedItemsChange }) => {
  const renderTreeItems = (items: StorageItem[]) =>
    items.map(
      (item) =>
        item.child && (
          <TreeItem
            key={item.id}
            itemId={item.id}
            label={
              <div className='flex items-center'>
                <div>
                  <IconifyIcon icon={'bi:folder'} className={`mr-2 h-4 w-4 text-yellow-600`} />
                </div>
                <span className='line-clamp-1 overflow-hidden'>{item.name}</span>
              </div>
            }
            onSelect={(event) => handleSelectedItemsChange(event, [item.id])}
            className='line-clamp-1 overflow-hidden'>
            {item.child && renderTreeItems(item.child)}
          </TreeItem>
        ),
    );

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 200 }}>
      <SimpleTreeView onSelectedItemsChange={handleSelectedItemsChange}>{renderTreeItems(selectedItems)}</SimpleTreeView>
    </Box>
  );
};

export default StorageTree;
