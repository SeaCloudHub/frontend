export type UserBlockREQ = {
  identity_id: string;
};

export type UserDeleteREQ = {
  identity_id: string;
};

export type ModifyStorageCapacityREQ = {
  identity_id: string;
  storage_capacity: number;
};
