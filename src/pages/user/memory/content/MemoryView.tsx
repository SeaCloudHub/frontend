import { LocalEntry } from '@/hooks/drive.hooks';
import { DataRow } from './DataRow';
import Sort from './Sort';
import Statistics from './Statistics';

type MemoryViewProps = {
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
  entries: LocalEntry[];
};

export const MemoryView: React.FC<MemoryViewProps> = ({ order, setSort, sort, entries }) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

  return (
    <div className='pl-5 pr-3'>
      <div className='relative flex flex-col'>
        <Statistics />
        <div className='sticky top-0 flex h-12 items-center space-x-3 border-b border-b-[#dadce0]  pt-2'>
          <div className='shrink grow basis-[304px] text-sm font-medium'>Files using Drive storage</div>
          <div className='shrink-0 grow-0 basis-[140px] text-sm font-medium max-[1450px]:basis-[140px] max-[1050px]:hidden'>
            <Sort sort={sort} order={order} setSort={setSort} />
          </div>
        </div>
        {folders.map((entry, index) => {
          return <DataRow key={index} {...entry} />;
        })}
        {files.map((entry, index) => {
          return <DataRow key={index} {...entry} />;
        })}
      </div>
    </div>
  );
};
