import { FileAction } from '@/utils/enums/file.enum';
import { isEnumValue } from '@/utils/function/checkValidEnum';
import { StorageLogDto } from '@/utils/types/strorage-log.type';
import dayjs from 'dayjs';
import { StatisticUserByMonth, UserFileLogRESP } from './response/dashboard.response';

const regex = /^\d{4}-(0?[1-9]|1[0-2])$/;

export const userByMonthToDto = (data: StatisticUserByMonth) => {
  const blockedUsers = Array(13).fill(0);
  const activeUsersData = Array(13).fill(0);
  Object.entries(data).forEach(([month, monthData]) => {
    if (regex.test(month)) {
      const monthIndex = parseInt(month.split('-')[1]);
      blockedUsers[monthIndex] = monthData.total_users - monthData.active_users || 0;
      activeUsersData[monthIndex] = monthData.active_users || 0;
    }
  });
  return [
    {
      name: 'Blocked Users',
      data: blockedUsers,
    },
    {
      name: 'Active Users',
      data: activeUsersData,
    },
  ];
};

export const storageLogToDto = (res: UserFileLogRESP) => {
  return {
    action: isEnumValue(FileAction, res.action.toString().toUpperCase()),
    date: (res.created_at && dayjs(res.created_at).format('YYYY-MM-DD')) || '',
    fileName: res.file?.name || '',
    username: res.user.first_name,
  } as StorageLogDto;
};
