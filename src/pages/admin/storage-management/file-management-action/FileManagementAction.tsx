import MenuCore from '../../../../components/core/menu/MenuCore';
import React from 'react';

const FileManagementAction = () => {
  return (
    <MenuCore
      menuItems={[
        { onClick: () => {}, title: 'Edit', icon: 'tabler:edit' },
        { onClick: () => {}, title: 'Delete', icon: 'ion:trash-sharp' },
        { onClick: () => {}, title: 'Rename', icon: 'bi:pencil' },
        { onClick: () => {}, title: 'Move', icon: 'ic:round-block' },
        { onClick: () => {}, title: 'Download', icon: 'ic:round-get-app' },
        { onClick: () => {}, title: 'Share', icon: 'ic:round-share' },
        { onClick: () => {}, title: 'Copy', icon: 'ic:round-file-copy' },
        { onClick: () => {}, title: 'Detail', icon: 'ep:view' },
      ]}
    />
  );
};

export default FileManagementAction;
