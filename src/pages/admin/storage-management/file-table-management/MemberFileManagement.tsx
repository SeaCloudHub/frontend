import { Avatar } from '@mui/material';
import React from 'react';

export type MemberFileManagementProps = {
  imgSrc: string;
};

const MemberFileManagement: React.FC<MemberFileManagementProps> = ({ imgSrc }) => {
  return <Avatar alt='Remy Sharp' src={imgSrc || 'https://picsum.photos/200/200'} />;
};

export default MemberFileManagement;
