import { Path, useSelected } from '@/store/my-drive/myDrive.store';
import Sort from '../content/Sort';
import DriveFilter from './DriveFilter';
import DriveViewMode from './DriveViewMode';
import InfoButton from './InfoButton';
import DrivePath from './drive-path/DrivePath';
import PriorityFilter from '../../priority/priority-filter/PriorityFilter';
import MultipleDriveHeader from './MultipleDriveHeader';

type MyDriveHeaderProps = {
  path: Path;
  typeFilter: string;
  peopleFilter: string;
  modifiedFilter: string;
  setTypeFilter: (type: string) => void;
  setPeopleFilter: (people: string) => void;
  setModifiedFilter: (modified: string) => void;
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
};

const MyDriveHeader: React.FC<MyDriveHeaderProps> = ({
  path,
  modifiedFilter,
  setModifiedFilter,
  peopleFilter,
  setPeopleFilter,
  typeFilter,
  setTypeFilter,
  sort,
  order,
  setSort,
}) => {
  const {arrSelected} = useSelected();

  return (
    <div className='flex flex-col pr-3'>
      <div className='flex'>
        <div className='w-full pb-[8px] pl-1 pt-[14px]'>
          <DrivePath path={path} type={'MyDrive'}/>
        </div>
        <div className='flex items-center pb-[6px] pl-[25px] pr-[11px] pt-[14px]'>
          <DriveViewMode />
          <div className='mx-1 my-0.5'>
            <InfoButton />
          </div>
        </div>
      </div>
      {arrSelected.length > 0 ? (
        <div className='px-4 py-1'>
          <MultipleDriveHeader parent='MyDrive' dir={path[path.length-1]} />
        </div>
      ) : (
        <div className='flex items-center justify-between pl-5 pr-3'>
          <div className='flex items-center gap-3'>
            <DriveFilter
              setModifiedFilter={setModifiedFilter}
              setPeopleFilter={setPeopleFilter}
              setTypeFilter={setTypeFilter}
              modifiedFilter={modifiedFilter}
              peopleFilter={peopleFilter}
              typeFilter={typeFilter}
            />
            {(typeFilter || peopleFilter || modifiedFilter) && (
              <div className='flex h-7 items-center rounded-full px-[12px] py-[1px] hover:bg-[#ededed]'>
                <div
                  onClick={() => {
                    setTypeFilter('');
                    setPeopleFilter('');
                    setModifiedFilter('');
                  }}
                  className='cursor-pointer text-sm font-medium'>
                  Clear filters
                </div>
              </div>
            )}
          </div>
          <Sort sort={sort} order={order} setSort={setSort} />
        </div>
      )}
    </div>
  );
};

export default MyDriveHeader;
