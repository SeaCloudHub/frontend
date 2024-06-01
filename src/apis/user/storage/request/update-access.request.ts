export type UpdateAccessREQ = {
  id: string;
  access: Access[];
};

type Access = {
  user_id: string;
  role: 'viewer' | 'editor';
};