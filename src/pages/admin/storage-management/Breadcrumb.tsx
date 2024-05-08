type BreadcrumbProps = {};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({}) => {
  return (
    <div className='flex items-center space-x-2'>
      <div>Home</div>
      <div>/</div>
      <div>Storage Management</div>
      <div>/</div>
      <div>File Table Management</div>
    </div>
  );
};
