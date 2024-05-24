import DriveLayout from "@/components/layout/DriveLayout";
import { useSharedFileInfo } from "@/store/storage/file-share-info.store";
import DrivePath from "../my-drive/header/drive-path/DrivePath";
import SharingPageViewMode from "../shared/sharing-page-view/SharingPageViewMode";
import { useDrawer, useFilter, useSelected, useViewMode } from "@/store/my-drive/myDrive.store";
import { Icon } from "@iconify/react/dist/iconify.js";
import SharingPageFilter from "../shared/sharing-page-filter/SharingPageFilter";
import { DriveGridView } from "../my-drive/content/DriveGridView";
import { DriveListView } from "../my-drive/content/DriveListView";
import SidePanel from "../my-drive/side-panel/SidePanel";
import { useStorageStore } from "@/store/storage/storage.store";
import MultipleDriveHeader from "../my-drive/header/MultipleDriveHeader";

const ShareFolder = () => {
  const {rootId} = useStorageStore();
  const {fileInfo, role} = useSharedFileInfo();
  const {viewMode, setViewMode} = useViewMode();
  const {drawerOpen, openDrawer, closeDrawer} = useDrawer();
  const {arrSelected} = useSelected();
  const {modifiedFilter, typeFilter, setModifiedFilter, setTypeFilter} = useFilter();

  return (<>SharedFolder</>
  // <DriveLayout
  //   headerLeft={
  //     <div className='flex flex-col overflow-hidden'>
  //       <div className='flex justify-between space-x-2 text-2xl'>
  //         <div className='w-full pb-[14px] pt-[15px]'>
  //           <DrivePath path={parents} type='Shared' />
  //         </div>
  //         <div className='flex items-center gap-2'>
  //           <SharingPageViewMode setViewMode={setViewMode} viewMode={viewMode} />
  //           <Icon
  //             icon='mdi:information-outline'
  //             className='h-8 w-8 cursor-pointer rounded-full p-1 transition-all hover:bg-surfaceContainerLow active:brightness-90'
  //             onClick={() => {
  //               if (!drawerOpen) {
  //                 openDrawer();
  //               } else {
  //                 closeDrawer();
  //               }
  //             }}
  //           />
  //         </div>
  //       </div>
  //       {arrSelected.length === 0 ? (
  //         <>
  //           <div className='flex items-center gap-3 px-5'>
  //             <SharingPageFilter />
  //             {(typeFilter || modifiedFilter) && (
  //               <div className='flex h-7 items-center rounded-full px-[12px] py-[1px] hover:bg-[#ededed]'>
  //                 <div
  //                   onClick={() => {
  //                     setTypeFilter('');
  //                     setModifiedFilter('');
  //                   }}
  //                   className='cursor-pointer text-sm font-medium'>
  //                   Clear filters
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </>
  //       ) : (
  //         <div className='overflow-x-auto px-4 py-1'>
  //           <MultipleDriveHeader
  //             parent='SharedWithMe'
  //             dir={{
  //               id: arrSelected.length === 1 ? arrSelected[0].id : '',
  //               name: arrSelected.length === 1 ? data.find((item) => item.id === arrSelected[0].id)?.title || '' : '',
  //             }}
  //           />
  //         </div>
  //       )}
  //     </div>
  //   }
  //   bodyLeft={
  //     viewMode === 'grid' ? (
  //       <DriveGridView entries={data} isLoading={isLoading} curDir={parents[parents.length - 1]} />
  //     ) : (
  //       <DriveListView entries={data} curDir={parents[parents.length - 1]} isLoading={isLoading} />
  //     )
  //   }
  //   sidePanel={
  //     <SidePanel
  //       isHidden={arrSelected.length === 0}
  //       id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0].id : ''}
  //       title={
  //         arrSelected.length === 0
  //           ? 'Shared'
  //           : data.find((item) => item.id === arrSelected[arrSelected.length - 1].id)?.title || ''
  //       }
  //     />
  //   }
  // />
  );
};

export default ShareFolder;
