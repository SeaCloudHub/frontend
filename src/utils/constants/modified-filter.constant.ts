export const modifiedFilterItems = [
  {
    label: 'Today',
    icon: null,
    value: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
  },
  {
    label: 'Last 7 days',
    icon: null,
    value: new Date(new Date(new Date().setDate(new Date().getDate() - 7)).setHours(0, 0, 0, 0)).toISOString(),
  },
  {
    label: 'This year ' + new Date().getFullYear(),
    icon: null,
    value: new Date(new Date().setMonth(0, 1)).toISOString(),
  },
];
