import { StatisticUserByMonth } from './response/dashboard.response';

const regex = /^\d{4}-(0?[1-9]|1[0-2])$/;

export const userByMonthToDto = (data: StatisticUserByMonth) => {
  const visitedUsersData = Array(13).fill(0);
  const activeUsersData = Array(13).fill(0);
  Object.entries(data).forEach(([month, monthData]) => {
    if (regex.test(month)) {
      const monthIndex = parseInt(month.split('-')[1]);
      visitedUsersData[monthIndex] = monthData.total_users || 0;
      activeUsersData[monthIndex] = monthData.active_users || 0;
    }
  });
  return [
    {
      name: 'Blocked Users',
      data: visitedUsersData,
    },
    {
      name: 'Active Users',
      data: activeUsersData,
    },
  ];
};
