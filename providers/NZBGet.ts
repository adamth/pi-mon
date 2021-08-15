import {
  NZBGetRequest,
  QueueItem,
  NZBResponseQueueItem,
  ServiceProvider,
  TestResult,
} from '../pages/api/status/types';
import axios from 'axios';

type NZBGetProps = {
  host: string;
  username: string;
  password: string;
};

export class NZBGet extends ServiceProvider {
  host;
  username;
  password;

  constructor({ host, username, password }: NZBGetProps) {
    super();
    this.host = host;
    this.username = username;
    this.password = password;
  }

  private call = async (
    method: 'status' | 'listgroups' | 'pausedownload' | 'resumedownload',
    params?: any,
  ) => {
    const url = `http://${this.username}:${this.password}@${this.host}/jsonrpc`;

    const payload: NZBGetRequest = {
      method: method,
      jsonrpc: '2.0',
      id: 0,
    };

    if (params) {
      payload.params = params;
    }

    const response = await axios.post(url, payload);
    return response.data['result'];
  };

  async getDownloadSpeed(): Promise<number> {
    const status = await this.call('status');
    return status['DownloadRate'];
  }

  async getQueue(): Promise<Array<QueueItem>> {
    const queue = await this.call('listgroups');
    return queue.map((item: NZBResponseQueueItem) => ({
      name: item['NZBName'],
      status: item['Status'],
    }));
  }

  async pause(): Promise<void> {
    console.log('got here!!');
    try {
      const result = await this.call('pausedownload');
      console.log(result);
    } catch (e) {
      console.log('error!', e);
    }
  }

  async resume(): Promise<void> {
    await this.call('resumedownload');
  }

  public static serviceName = 'NZBGet';
  public static fields = ['host', 'username', 'password'];
  public static imageUrl = '/nzbget-logo.png';

  async test(): Promise<TestResult> {
    try {
      await this.getDownloadSpeed();
      return { pass: true };
    } catch (e) {
      if (e.code === 'ECONNREFUSED') {
        return { pass: false, message: 'Could not connect to host' };
      }
      return { pass: false, message: e.message };
    }
  }
}
