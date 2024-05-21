import { useSharedFileInfo } from "@/store/storage/file-share-info.store";

const ShareFolder = () => {
   const fileInfo = useSharedFileInfo((state) => state.fileInfo);
  return <div>ShareFolder</div>;
};

export default ShareFolder;
