import { Path, useSelected, useFilter } from '@/store/my-drive/myDrive.store';
import Sort from '../content/Sort';
import DriveFilter from './DriveFilter';
import DriveViewMode from './DriveViewMode';
import InfoButton from './InfoButton';
import DrivePath from './drive-path/DrivePath';
import PriorityFilter from '../../priority/priority-filter/PriorityFilter';
import MultipleDriveHeader from './MultipleDriveHeader';
import { Tooltip } from '@mui/material';
import { TypeEntry } from '@/apis/drive/drive.request';
import { UserRole } from '@/utils/types/user-role.type';

type MyDriveHeaderProps = {
  path: { id: string; name: string; userRoles: UserRole[]; is_starred: boolean }[];
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
};

const MyDriveHeader: React.FC<MyDriveHeaderProps> = ({ path, sort, order, setSort }) => {
  const { arrSelected } = useSelected();
  const { setTypeFilter, typeFilter, modifiedFilter, setModifiedFilter } = useFilter();

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex min-w-[375px] justify-between'>
        <div className='pb-[8px] pl-1 pt-[14px]'>
          <DrivePath path={path} type={'MyDrive'} />
        </div>
        <div className='flex items-center pb-[6px] pr-[11px] pt-[14px]'>
          <DriveViewMode />
          <div className='mx-1 my-0.5'>
            <InfoButton />
          </div>
        </div>
      </div>
      {arrSelected.length > 0 ? (
        <div className='overflow-x-auto px-4 py-0.5'>
          <MultipleDriveHeader parent='MyDrive' dir={path[path.length - 1]} />
        </div>
      ) : (
        <div className='w-full pl-5'>
          <div className='flex items-center justify-between overflow-x-auto'>
            <div className='flex gap-3'>
              <DriveFilter />
              {(typeFilter || modifiedFilter) && (
                <div className='flex h-7 items-center rounded-full px-[12px] py-[1px] hover:bg-slate-200 active:brightness-90 dark:hover:bg-slate-500'>
                  <Tooltip title='Clear filters'>
                    <div
                      onClick={() => {
                        setTypeFilter('');
                        setModifiedFilter('');
                      }}
                      className='line-clamp-1 cursor-pointer text-sm font-medium'>
                      Clear filters
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
            {/* <Sort sort={sort} order={order} setSort={setSort} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDriveHeader;
