import TextInputCore from '../../../../../../components/core/input/TextInputCore';
import SectionBorder from '../../../../../../components/core/section-boder/SectionBoder';
import React, { useState } from 'react';

type FileFolderFilterProps = {
  name: string;
};
// const [type,setType]=useState<'File'|'Folder'>('File');

const FileFolderFilter = ({ name }: FileFolderFilterProps) => {
  return (
    <>
      <SectionBorder title='Storage Filter'>
        <div className='flex flex-wrap'>
          <TextInputCore onChange={() => {}} label='Name' placeholder='name' />
        </div>
      </SectionBorder>
    </>
  );
};

export default FileFolderFilter;
