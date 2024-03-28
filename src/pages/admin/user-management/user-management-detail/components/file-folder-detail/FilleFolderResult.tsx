type FilleFolderResultProps = {
  name?: string;
  type?: string;
  fileType?: string;
};
const dataTemps = [
  { name: 'File01.txt', owner: 'txt', lastModified: '12-2-2002', size: '2002MB' },
  { name: 'File01.txt', owner: 'docx', lastModified: '12-2-2002', size: '2002MB' },
  { name: 'File01.txt', owner: 'docy', lastModified: '12-2-2002', size: '2002MB' },
  { name: 'File01.txt', owner: 'txt', lastModified: '12-2-2002', size: '2002MB' },
];
const FilleFolderResult = ({ name, type, fileTye }: FilleFolderResultProps) => {
  return <div className='max-h-[300px] overflow-auto'></div>;
};

export default FilleFolderResult;
