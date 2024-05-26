import { createFolderApi } from '@/apis/user/storage/storage.api';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ModalCore from './ModalCore';
import { Icon } from '@iconify/react/dist/iconify.js';

type ModalHelpProps = {
  isOpen: boolean;
  handleConfirm?: (data?: any) => void;
};

const ModalHelp = ({ isOpen, handleConfirm }: ModalHelpProps) => {
  const helpOptions = [
    {
      description: 'Recover a deleted file',
      action: () => setselected(0),
      details: (
        <div className='max-h-[700px] overflow-y-auto'>
          <h3 className='statement-bold text-2xl'> Recover a deleted file</h3>
          <div className='list-inside list-decimal'>
            <li>Go to SeaCloudHub</li>
            <li>
              On the left click <div className='inline font-bold'>Trash</div>
              <div className='list-disc pl-4'>
                <li>All your deleted files are listed here</li>
                <li>
                  To find out how long ago files were added to the Trash, you can sort files by clicking the sort arrow with
                  "Trash date".
                </li>
              </div>
            </li>
            <li>
              To restore a file:
              <div className='list-disc pl-4'>
                <li>
                  Click the three dots icon <Icon icon='bi:three-dots-vertical' className='inline' /> on your file
                </li>
                <li>Click Restore</li>
              </div>
            </li>
          </div>
          <div>
            <div className='inline font-bold'>Tip: </div>
            Deleted files are stored in the Trash for 30 days before they’re deleted forever.
          </div>
          <div className='flex h-full w-full justify-center'>
            <img
              className='object-fit mb-4 w-[500px]'
              src={(import.meta.env.BASE_URL + 'guide-restore.gif') as string}
              alt='Guide1'
            />
          </div>
        </div>
      ),
    },
    {
      description: 'Share a folder',
      action: () => setselected(1),
      details: (
        <div className='max-h-[700px] overflow-y-auto'>
          <h3 className='statement-bold text-2xl'> Share a folder</h3>
          <div className='list-inside list-decimal'>
            <li>Go to SeaCloudHub</li>
            <li>
              Click the three dots icon <Icon icon='bi:three-dots-vertical' className='inline' /> on your folder
            </li>
            <li>Click Share</li>
            <li>Search the email of the users you want to share the folder with </li>
            <li>Select their permission </li>
            <li>Confirm by clicking Share </li>
          </div>

          <div className='flex h-full w-full justify-center'>
            <img
              className='object-fit mb-4 w-[500px]'
              src={(import.meta.env.BASE_URL + 'guide-share-folder.gif') as string}
              alt='Guide1'
            />
          </div>
        </div>
      ),
    },
  ];

  const [selected, setselected] = useState(-1);

  return (
    <>
      <ModalCore
        open={isOpen}
        width={'30%'}
        closeOutside={() => {
          handleConfirm && handleConfirm(false);
        }}>
        <div className='mb-3 flex w-full flex-col space-y-3'>
          <h3 className='statement-bold text-2xl'>Help</h3>
          <div className='mt-10 flex flex-col rounded-lg border'>
            {helpOptions.map((option, index) => (
              <div
                key={index}
                className='grid cursor-pointer grid-cols-7 items-center border-t px-5 py-4 hover:bg-gray-200 active:brightness-90 dark:hover:bg-slate-500'
                onClick={option.action}>
                <div className='col-span-4'>{option.description}</div>
              </div>
            ))}
          </div>
        </div>
      </ModalCore>
      {selected !== -1 && (
        <ModalCore open={selected !== -1} width={'100%'} closeOutside={() => setselected(-1)}>
          {helpOptions[selected].details}
        </ModalCore>
      )}
    </>
  );
};

export default ModalHelp;
