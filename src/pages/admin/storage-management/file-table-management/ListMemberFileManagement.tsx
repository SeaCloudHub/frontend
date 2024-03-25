import React from 'react';
import MemberFileManagement, { MemberFileManagementProps } from './MemberFileManagement';
import { AvatarGroup } from '@mui/material';

type ListMemberFileManagementProps = {
  members: MemberFileManagementProps[];
};

const ListMemberFileManagement: React.FC<ListMemberFileManagementProps> = ({ members }) => {
  return (
    members &&
    members.length > 0 && (
      <AvatarGroup total={members.length}>
        {members.map((member, index) => (
          <MemberFileManagement key={index} imgSrc={member.imgSrc} />
        ))}
      </AvatarGroup>
    )
  );
};

export default ListMemberFileManagement;
