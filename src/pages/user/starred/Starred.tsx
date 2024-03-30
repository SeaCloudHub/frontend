import { useState } from 'react';
import { useViewMode } from '../my-drive/MyDrive';
import SharingPageViewMode from '../shared/sharing-page-view/SharingPageViewMode';
import SharingPageFilter from '../shared/sharing-page-filter/SharingPageFilter';
import { Icon } from '@iconify/react/dist/iconify.js';
import ButtonCore from '@/components/core/button/ButtonCore';
import StarredView from './stared-view/StarredView';
import { fakeData } from '../shared/Shared';

const Starred = () => {
  const { viewMode, setViewMode } = useViewMode();
  const [typeFilterItem, setTypeFilterItem] = useState<string>('');
  const [peopleFilterItem, setPeopleFilterItem] = useState<string>('');
  const [modifiedFilterItem, setModifiedFilterItem] = useState<string>('');
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  return (
    <div className='w-full'>
      <div className='flex justify-between space-x-2 text-2xl'>
        <h2 className='py-2 text-3xl font-semibold'>Shared with me</h2>
        <div className='flex items-center gap-2'>
          <SharingPageViewMode setViewMode={setViewMode} viewMode={viewMode} />
          <Icon
            icon='mdi:information-outline'
            className='h-8 w-8 cursor-pointer rounded-full p-1 transition-all hover:bg-surfaceContainerLow active:brightness-90'
            onClick={() => setIsShowDetail(!isShowDetail)}
          />
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <SharingPageFilter
          setModifiedFilterItem={setModifiedFilterItem}
          setPeopleFilterItem={setPeopleFilterItem}
          setTypeFilterItem={setTypeFilterItem}
          modifiedFilter={modifiedFilterItem}
          peopleFilter={peopleFilterItem}
          typeFilter={typeFilterItem}
        />
        {(typeFilterItem || peopleFilterItem || modifiedFilterItem) && (
          <ButtonCore
            title='Clear all filters'
            contentColor='black'
            onClick={() => {
              setTypeFilterItem('');
              setPeopleFilterItem('');
              setModifiedFilterItem('');
            }}
            type={'text'}
          />
        )}
      </div>
      <StarredView entries={fakeData} />
    </div>
  );
};

export default Starred;
