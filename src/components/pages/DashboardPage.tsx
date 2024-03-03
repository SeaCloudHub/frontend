import { FormControl, FormLabel, Option, Select } from '@mui/joy';

const renderFilters = () => {
  return (
    <>
      <FormControl size='sm'>
        <FormLabel>Status</FormLabel>
        <Select size='sm' placeholder='Filter by'>
          <Option value='all'> All</Option>
          <Option value='active'>Active</Option>
          <Option value='completed'>Completed</Option>
        </Select>
      </FormControl>
      <FormControl size='sm'>
        <FormLabel>Filter by</FormLabel>
        <Select size='sm' placeholder='Filter by'>
          <Option value='all'>All</Option>
          <Option value='active'>Active</Option>
          <Option value='completed'>Completed</Option>
        </Select>
      </FormControl>
      <FormControl size='sm'>
        <FormLabel>Filter by</FormLabel>
        <Select size='sm' placeholder='Filter by'>
          <Option value='all'>All</Option>
          <Option value='active'>Active</Option>
          <Option value='completed'>Completed</Option>
        </Select>
      </FormControl>
    </>
  );
};

export default renderFilters;
