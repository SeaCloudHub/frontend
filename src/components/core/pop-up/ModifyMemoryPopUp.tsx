import React from 'react';
import PopUp from './PopUp';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TextInputCore from '../input/TextInputCore';
import ButtonCancel from '../button/ButtonCancel';
import ButtonSuccess from '../button/ButtonSuccess';
import { useModifyStorageCapacityMutation } from '@/hooks/drive.hooks';
import { Icon } from '@iconify/react/dist/iconify.js';
import TextFieldCore from '../form/TextFieldCore';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type ModifyMemoryPopUpProps = {
  open: boolean;
  onClose: () => void;
  identity_id: string;
};

const ModifyMemoryPopUp: React.FC<ModifyMemoryPopUpProps> = ({onClose, open, identity_id}) => {
  const modifyStorageCapacityMutation = useModifyStorageCapacityMutation(['user-details' ,identity_id]);
  const formik = useFormik({
    initialValues: { capacity: 0 },
    validationSchema: Yup.object({ capacity: Yup.number().required('Memory Name is required') }),
    onSubmit: (values) => {
      modifyStorageCapacityMutation.mutateAsync(
        { storage_capacity: values.capacity * Math.pow(2, 30) , identity_id },
        { onSuccess: () =>  onClose() }
      );
    },
  });

  return (
    <PopUp open={open} handleClose={onClose}>
      <form className='min-w-96 max-w-[400px] bg-white dark:bg-[#031525]' onSubmit={formik.handleSubmit}>
        <DialogTitle className='flex items-center justify-between p-4'>
          <p className='text-lg font-bold'>Modify Memory</p>
          <button onClick={onClose} className='rounded-full p-2 hover:bg-gray-200 dark:hover:bg-slate-800'>
            <Icon icon='eva:close-outline' width={24} height={24} />
          </button>
        </DialogTitle>
        <DialogContent>
          <TextFieldCore
            type='number'
            label='Memory Capacity (GB)'
            name='capacity'
            sx={{ marginTop: '5px' }}
            value={formik.values.capacity}
            onChange={formik.handleChange}
            error={formik.touched.capacity && Boolean(formik.errors.capacity)}
            helperText={formik.touched.capacity && formik.errors.capacity}
          />
        </DialogContent>
        <DialogActions className='flex justify-end p-4'>
          <ButtonCancel onClick={onClose}> Cancel </ButtonCancel>
          <ButtonSuccess type='submit'> Save </ButtonSuccess>
        </DialogActions>
      </form>
    </PopUp>
  );
};

export default ModifyMemoryPopUp;
