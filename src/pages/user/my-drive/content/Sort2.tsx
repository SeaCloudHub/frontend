// import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';
// import { Icon } from '@iconify/react/dist/iconify.js';
// import { Tooltip } from '@mui/material';

// type Sort2Props = {
//   sort: string;
//   order: string;
//   setSort: ({ sort, order }: { sort: string; order: string }) => void;
//   sortItems?: MenuItem[][];
//   active: boolean;
// };

// const Sort2: React.FC<Sort2Props> = ({ sort, order, setSort, sortItems, active }) => {
//   return (
//     <Tooltip title={'Sort by' + sort}>
//       <div className='flex flex-row items-center'>
//         {sortItems ? (
//           <Dropdown
//             button={
//               <div className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'>
//                 <div className='pb-1 text-sm font-medium'>{sort}</div>
//                 <Icon icon='mdi:caret-down' className='h-5 w-5' />
//               </div>
//             }
//             items={sortItems}
//             left={true}
//           />
//         ) : (
//           <div
//             className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'
//             onClick={() => {
//               setSort({ sort, order });
//             }}>
//             <div className='pb-1 text-sm font-medium'>{sort}</div>
//           </div>
//         )}
//         {active && (
//           <div
//             className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#ededed]'
//             onClick={() => {
//               setSort({ sort, order: order === 'asc' ? 'desc' : 'asc' });
//             }}>
//             {order === 'asc' ? (
//               <Icon icon='mdi:arrow-up' className='h-[18px] w-[18px]' />
//             ) : (
//               <Icon icon='mdi:arrow-down' className='h-[18px] w-[18px]' />
//             )}
//           </div>
//         )}
//       </div>
//     </Tooltip>
//   );
// };

// export default Sort2;
