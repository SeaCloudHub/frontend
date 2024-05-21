import { useSharedFileInfo } from "@/store/storage/file-share-info.store";

const ShareFolder = () => {
   const {fileInfo,role} = useSharedFileInfo();
  return <div>ShareFolder</div>;
};

export default ShareFolder;
