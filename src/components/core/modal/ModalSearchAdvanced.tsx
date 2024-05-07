import { DropdownItems } from '@/utils/types/drop-down.type';
import React from 'react';
import { BiSolidFileDoc, BiSolidImageAlt } from 'react-icons/bi';
import { CiFolderOn } from 'react-icons/ci';
import { FaFilePowerpoint, FaFolder, FaGoogleDrive } from 'react-icons/fa6';
import { MdFolderShared, MdPictureAsPdf } from 'react-icons/md';
import { PiGoogleDriveLogoThin } from 'react-icons/pi';
import { RiFileExcel2Line } from 'react-icons/ri';
import ButtonContainer from '../button/ButtonContainer';
import ButtonIcon from '../button/ButtonIcon';
import DatePickerCore from '../input/DatePickerCore';
import DropdownCore from '../input/DropdownCore';
import TextInputCore from '../input/TextInputCore';
import ModalCore from './ModalCore';

type ModalSearchAdvancedProps = {
  isOpen: boolean;
  handleConfirm: (data?: any) => void;
};

const InputField: React.FC<{ label: string; component: React.ReactNode }> = ({ label, component }) => (
  <div className='flex items-center'>
    <p className='statement-upper-medium w-[150px] truncate pr-2'>{label}</p>
    <div className='flex-grow'>{component}</div>
  </div>
);
const typeOptions: DropdownItems = [
  { label: 'Any', value: 'Any' },
  { label: 'Photos & images', value: 'Photos & images', preIcon: <BiSolidImageAlt className=' text-[#CA2E24]' /> },
  {
    label: 'PDFS',
    value: 'PDFS',
    preIcon: <MdPictureAsPdf className=' text-[#CA2E24]' />,
  },
  { label: 'Documents', value: 'Documents', preIcon: <BiSolidFileDoc className=' text-[#447DD7]' /> },
  { label: 'Spreadsheets', value: 'Spreadsheets', preIcon: <RiFileExcel2Line className='text-green-600' /> },
  { label: 'Presentations', value: 'Presentations', preIcon: <FaFilePowerpoint className=' text-red-500' /> },
  { label: 'Folders', value: 'Folders', preIcon: <FaFolder className='' /> },
];
const ownerOptions: DropdownItems = [
  {
    label: 'Anyone',
    value: 'Anyone',
  },
  {
    label: 'Owned by me',
    value: 'Owned by me',
  },
  {
    label: 'Not owned by me',
    value: 'Not owned by me',
  },
];
const locationOptions: DropdownItems = [
  { label: 'Anywhere', value: 'Anywhere', preIcon: <PiGoogleDriveLogoThin /> },
  { label: 'Google drive', value: 'Google drive', preIcon: <FaGoogleDrive /> },
  { label: 'Shared with me', value: 'Shared with me', preIcon: <MdFolderShared /> },
  { label: 'More location...', value: 'Anywhere', preIcon: <CiFolderOn /> },
];
const dateModifiedOptions: DropdownItems = [
  {
    label: 'Any time',
    value: 'Any time',
  },
  {
    label: 'Today',
    value: 'Today',
  },
  {
    label: 'Yesterday',
    value: 'Yesterday',
  },
  {
    label: 'Last 7 days',
    value: 'Last 7 days',
  },
  {
    label: 'Last 30 days',
    value: 'Last 30 days',
  },
  {
    label: 'Custom...',
    value: 'Custom',
  },
];
const ModalSearchAdvanced: React.FC<ModalSearchAdvancedProps> = ({ isOpen, handleConfirm }) => {
  const fields = [
    { label: 'Type', component: <DropdownCore height='45px' minWidth='15rem' options={typeOptions} /> },
    { label: 'Owner', component: <DropdownCore height='45px' minWidth='15rem' options={ownerOptions} /> },
    { label: 'Item name', component: <TextInputCore fullWidth /> },
    { label: 'Location', component: <DropdownCore height='45px' minWidth='15rem' options={locationOptions} /> },
    { label: 'Shared to', component: <TextInputCore fullWidth /> },
    { label: 'Date modified', component: <DropdownCore height='45px' minWidth='15rem' options={dateModifiedOptions} /> },
  ];
  const onResetFilter = () => {};
  return (
    <ModalCore open={isOpen} width={'45%'} closeOutside={handleConfirm}>
      <div className='relative justify-center md:p-3'>
        <div className='flex w-full justify-end'>
          <ButtonIcon
            icon='ic:round-close'
            onClick={() => {
              handleConfirm();
            }}
          />
        </div>
        <div className='flex max-h-[55vh] flex-col space-y-5 overflow-y-auto py-[20px]'>
          {fields.map(({ label, component }, index) => (
            <InputField key={index} label={label} component={component} />
          ))}
          <div className='flex items-center'>
            <p className='statement-upper-medium w-[150px] truncate pr-2'>{}</p>
            <div>
              <p className='statement-upper-medium'></p>
              <div className='flex items-center space-x-1'>
                <DatePickerCore label='After date' />
                <DatePickerCore label='Before date' />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3 flex w-full items-center justify-end space-x-3'>
          <p
            className='text-blue statement-upper-medium cursor-pointer px-3 py-2 text-blue-600 hover:rounded-2xl hover:bg-blue-100'
            onClick={() => {}}>
            Reset
          </p>
          <ButtonContainer title='Search' background='#0b57d0' onClick={() => {}} />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalSearchAdvanced;
