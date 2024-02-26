// pagination (small, medium, large) size

import React from 'react';
import { Pagination } from '@mui/material';

type PaginationSizeProps = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  size: 'small' | 'medium' | 'large';
};
