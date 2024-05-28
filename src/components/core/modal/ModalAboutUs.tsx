import { createFolderApi } from '@/apis/user/storage/storage.api';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ModalCore from './ModalCore';
import { Icon } from '@iconify/react/dist/iconify.js';

type ModalAboutUsProps = {
  isOpen: boolean;
  handleConfirm?: (data?: any) => void;
};

const ModalAboutUs = ({ isOpen, handleConfirm }: ModalAboutUsProps) => {
  return (
    <>
      <ModalCore
        open={isOpen}
        width={'100%'}
        closeOutside={() => {
          handleConfirm && handleConfirm(false);
        }}>
        <div className='mb-3 flex max-h-[700px] w-full flex-col space-y-3 overflow-y-auto'>
          <h3 className='statement-bold text-2xl'>About Us</h3>
          <div>This is our Graduation project</div>
          <div>Credit:</div>
          <div className='list-disc'>
            <li>Vo Phi Hung</li>
            <li>Thai Nguyen Viet Hung</li>
            <li>Nguyen Canh Huy</li>
            <li>Phan Nhat Trieu</li>
            <li>Le Kim Hieu</li>
            <li>Nguyen Quang Tuyen</li>
          </div>
        </div>
      </ModalCore>
    </>
  );
};

export default ModalAboutUs;
