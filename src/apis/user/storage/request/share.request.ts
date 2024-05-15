export type SharedUsersSearchREQ = {
  query: string;
}

export type ShareFileREQ = {
  emails: string[];
  id: string;
  role: 'viewer'|'editor';
};
