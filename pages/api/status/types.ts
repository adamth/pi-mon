export interface ServiceProvider {
  getDownloadSpeed: () => Promise<string>;
  getQueue: () => Promise<Array<any>>;
}

export type NZBGetQueueItem = {
  name: string;
  niceName: string;
  status: string;
};

export type NZBGetRequest = {
  method: string;
  jsonrpc: string;
  id: number;
  params?: any;
};

export type TransmissionRequest = {
  method: string;
  arguments?: any;
  tag?: number;
};

export type TransmissionResponse<T> = {
  result: string;
  arguments?: T;
  tag?: number;
  status: number;
  headers: any;
};

export type TransmissionSessionStatistics = {
  activeTorrentCount: number;
  downloadSpeed: number;
  pausedTorrentCount: number;
  torrentCount: number;
  uploadSpeed: number;
};

export type TransmissionResponseQueueItem = {
  torrents: Array<{
    name: string;
    status: number;
  }>;
};

export type TransmissionQueueItem = {
  name: string;
  status: string;
};

export type NZBResponseQueueItem = {
  NZBName: string;
  NZBNicename: string;
  Category: string;
  Status: string;
  FileSizeMB: string;
  RemainingSizeMB: string;
  DownloadedSizeMB: string;
  DownloadTimeSec: string;
};
