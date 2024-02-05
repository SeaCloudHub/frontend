import { pageSizeOptions } from '@/utils/constants/pagination.constant';

import DropdownCore from '../input/DropdownCore';

type PaginationSizeProps = { onPageSizeChange: (size: number) => void };
export type PaginationSizeEvent = PaginationSizeProps['onPageSizeChange'];
export default function PaginationSize({ onPageSizeChange }: PaginationSizeProps) {
  return (
    <DropdownCore
      onChange={onPageSizeChange}
      height='h-[32px]'
      style='w-[124px] pagination-select'
      options={pageSizeOptions}
      isDefault
    />
  );
}
