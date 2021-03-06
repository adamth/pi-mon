export type TestResult = {
  pass: boolean;
  message?: string;
};

export abstract class ServiceProvider {
  abstract getDownloadSpeed(): Promise<number>;
  abstract getQueue(): Promise<Array<QueueItem>>;
  abstract pause(): Promise<void>;
  abstract resume(): Promise<void>;
  abstract test(): Promise<TestResult>;
  public static serviceName: string;
  public static fields: Array<string>;
  public static imageUrl: string;
}

export type QueueItem = {
  name: string;
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
