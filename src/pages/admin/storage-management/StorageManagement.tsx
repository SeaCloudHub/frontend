import { useState } from 'react';
import StorageTree, { StorageItem } from './storage-management-tree/StorageTree';
import FileTableManagement from './file-table-management/FileTableManagement';

const fakeData: StorageItem[] = [
  {
    id: '1',
    name: 'Root',
    child: [
      {
        id: '2',
        name: 'Child 1',
        child: [
          {
            id: '3',
            name: 'Child 1.1',
          },
        ],
      },
      {
        id: '4',
        name: 'Child 1.2',
      },
    ],
  },
  {
    id: '5',
    name: 'Child 2',
  },
  {
    id: '6',
    name: 'Child 3',
    child: [
      {
        id: '7',
        name: 'Child 3.1',
      },
      {
        id: '8',
        name: 'Child 3.2 asdfsdfasfdasf sdfasdfasdf dfsdfd',
        child: [
          {
            id: '9',
            name: 'Child 3.2.1',
            child: [
              {
                id: '10',
                name: 'Child 3.2.1.1',
              },
            ],
          },
        ],
      },
    ],
  },
];

const checkIdIsFolder = (id: string, data: StorageItem): string | null => {
  if (data.id === id) {
    return data.child ? data.name : null;
  }
  if (data.child) {
    for (const child of data.child) {
      const result = checkIdIsFolder(id, child);
      if (result) {
        return result;
      }
    }
  }
  return null;
};

const isFolder = (id: string, data: StorageItem[]): string | null => {
  for (const item of data) {
    const result = checkIdIsFolder(id, item);
    if (result) {
      return result;
    }
  }
  return null;
};

const StorageManagement = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  return (
    <>
      <div className='mb-5 text-2xl font-semibold'>Storage Management</div>
      <div className='flex'>
        <StorageTree
          selectedItems={fakeData}
          handleSelectedItemsChange={(_, id) => {
            const result = isFolder(id!, fakeData);
            result && setSelectedFolder(result);
          }}
        />
        <div className='w-full min-w-fit max-w-[calc(100%-200px)] px-3'>
          <div className='h4 mb-3 text-center font-semibold'>
            {selectedFolder || (fakeData.length > 0 && fakeData[0].name) || 'Document Empty'}
          </div>

          <FileTableManagement />
        </div>
      </div>
    </>
  );
};

export default StorageManagement;
