import { LocalEntry } from '@/hooks/drive.hooks';
import { formatDate } from '@/utils/function/formatDate.function';
import { Icon } from '@iconify/react/dist/iconify.js';
import DropdownCore from '../../../../../../components/core/input/DropdownCore';
import Order from '../../../../../../components/core/order/Order';
import { useScreenHook } from '../../../../../../hooks/useScreenHook';
import { fileOperations } from '../../../../../../utils/constants/dopdown.constant';
import fileTypeIcons from '../../../../../../utils/constants/file-icons.constant';
import { fakeEntries } from '../../../../../../utils/dumps/entries';
import { Entry } from '../../../../../../utils/types/entry.type';

type FileFolderResultProps = {
  name?: string;
  type?: string;
  fileType?: string;
};

const _entryToMyEntry = (entries: Entry[]): LocalEntry[] => {
  return entries.map((entry) => {
    if (entry.is_dir) {
      return {
        isDir: true,
        title: entry.name,
        icon: <Icon icon='ic:baseline-folder' className='object-cover-full h-full w-full dark:text-yellow-600' />,
        preview: <Icon icon='ic:baseline-folder' className='h-full w-full dark:text-yellow-600' />,
        id: entry.id,
        owner: null,
        fileType: '',
        lastModified: new Date(entry.updated_at),
        size: entry.size,
      } as LocalEntry;
    }
    const ext = entry.name.split('.').pop() || 'any';
    const icon = fileTypeIcons[ext] || fileTypeIcons.any;
    /* Suport mp4, mp3, pdf, jpg, jpeg, png, jfif, gif, webp, ico, svg,
    docx, txt, zip, any */
    const preview = ['jpg', 'ico', 'webp', 'png', 'jpeg', 'gif', 'jfif'].includes(ext) ? (
      <img
        draggable={false}
        className='h-full w-full rounded-md object-cover'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHRymTob1kd-ywHzIs0ty7UhrFUcJay839nNd6tcSig&s'
      />
    ) : (
      <div className='h-16 w-16'>{icon}</div>
    );
    return {
      isDir: false,
      title: entry.name,
      icon: icon,
      preview: preview,
      id: entry.id,
      owner: null,
      lastModified: new Date(entry.updated_at),
      size: entry.size,
    } as LocalEntry;
  });
};

const processedEntries = _entryToMyEntry(fakeEntries);

const FileFolderResult = ({ name, type, fileType }: FileFolderResultProps) => {
  const responsive = useScreenHook(700);
  const handleOnChangeOrder = (field: string, isAscending: boolean) => {
    // Implement your logic for handling order change here
  };

  return (
    <div className='h-[600px] w-full overflow-y-auto overflow-x-hidden '>
      <>
        <div className='flex w-full items-center border-b py-1'>
          <div className=' flex w-[50%]  items-center space-x-2'>
            <p className='statement-upper-medium'>Name</p>
            <Order
              iconDown='teenyicons:down-solid'
              iconUp='teenyicons:up-solid'
              onChange={(isAscending: boolean) => {
                handleOnChangeOrder('name', isAscending);
              }}
            />
          </div>
          {!responsive && (
            <div className='flex w-[50%] items-center  justify-end truncate'>
              <p className='statement-upper-medium w-1/3'>Owner</p>
              <div className='flex w-1/3 items-center '>
                <DropdownCore options={fileOperations} isDefault={true} />
                <Order
                  iconDown='ph:arrow-down-bold'
                  iconUp='ph:arrow-up-bold'
                  onChange={(isAscending: boolean) => {
                    handleOnChangeOrder('name', isAscending);
                  }}
                />
              </div>
              <div className='w flex w-1/3 items-center justify-end '>
                <p className='statement-upper-medium'>Size</p>
                <Order
                  iconDown='ph:arrow-down-bold'
                  iconUp='ph:arrow-up-bold'
                  onChange={(isAscending: boolean) => {
                    handleOnChangeOrder('name', isAscending);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {/* Content section */}
        {processedEntries.map((item, index) => (
          <div className='flex w-full items-center border-b py-2' key={index}>
            <div className='w-[50%] items-center justify-start space-x-2'>
              <p className=' truncate'>{item.title}</p>
            </div>
            {!responsive && (
              <div className='flex w-[50%] items-center justify-end'>
                <p className='w-1/3 truncate'>{item.owner && ''}</p>
                <p className='w-1/3 truncate'>{formatDate(item.lastModified, '')}</p>
                <p className='w-1/3  truncate pr-4 text-end'>{item.size}</p>
              </div>
            )}
          </div>
        ))}
      </>
    </div>
  );
};

export default FileFolderResult;
