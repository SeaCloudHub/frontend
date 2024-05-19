import { useSession } from '@/store/auth/session';

export const FormatDateStrToDDMMYYYY = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const FormatDateStrToMMHHDDMMYYYY = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  });
};
