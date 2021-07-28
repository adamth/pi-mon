type DownloadRate = {
  speed: number;
  rate: string;
};

export const bytesToSize = (bytes: number): DownloadRate => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return { speed: 0, rate: 'Bytes' };
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return {
    speed: parseFloat((bytes / Math.pow(1024, i)).toFixed(2)),
    rate: sizes[i],
  };
};
