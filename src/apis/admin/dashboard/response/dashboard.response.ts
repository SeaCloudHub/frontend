export type DashboardRESP = {
  Topology: Topology;
  Version: string;
  Volumes: Volumes;
};

export type Topology = {
  DataCenters: DataCenter[];
  Free: number;
  Layouts: Layout[];
  Max: number;
};

export type DataCenter = {
  Id: string;
  Racks: Rack[];
};

export type Rack = {
  DataNodes: DataNode[];
  Id: string;
};

export type DataNode = {
  EcShards: number;
  Max: number;
  PublicUrl: string;
  Url: string;
  VolumeIds: string;
  Volumes: number;
};

export type Layout = {
  collection: string;
  diskType: string;
  replication: string;
  ttl: string;
  writables: number[];
};

export type Volumes = {
  DataCenters: DataCenters;
  Free: number;
  Max: number;
};

export type DataCenters = {
  DefaultDataCenter: DefaultDataCenter;
};

export type DefaultDataCenter = {
  DefaultRack: { [key: string]: DefaultRack[] | null };
};

export type DefaultRack = {
  Collection: string;
  CompactRevision: number;
  DeleteCount: number;
  DeletedByteCount: number;
  DiskType: string;
  FileCount: number;
  Id: number;
  ModifiedAtSecond: number;
  ReadOnly: boolean;
  RemoteStorageKey: string;
  RemoteStorageName: string;
  ReplicaPlacement: ReplicaPlacement;
  Size: number;
  Ttl: TTL;
  Version: number;
};

export type ReplicaPlacement = object;

export type TTL = {
  Count: number;
  Unit: number;
};

export type StatisticRESP = {
  statistic_user: StatisticUser[];
  statistic_user_by_month: StatisticUserByMonth;
  total_storage_usage: number;
  total_storage_capacity: number;
  file_by_type: FileByType;
};
type StatisticUser = {
  name: string;
  value: number;
  percentage: number;
};

export type StatisticUserByMonth = {
  [key: string]: {
    total_users: number;
    active_users: number;
    blocked_users: number;
  };
};

type FileByType = {
  [key: string]: number;
};
