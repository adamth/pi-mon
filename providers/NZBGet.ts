import {
  NZBGetRequest,
  QueueItem,
  NZBResponseQueueItem,
  ServiceProvider,
} from '../pages/api/status/types';
import axios from 'axios';

type NZBGetProps = {
  host: string;
  username: string;
  password: string;
};

export class NZBGet implements ServiceProvider {
  host;
  username;
  password;

  public static params = ['host', 'username', 'password'];
  public static logo = '/nzbget-logo.png';

  constructor({ host, username, password }: NZBGetProps) {
    this.host = host;
    this.username = username;
    this.password = password;
  }

  private call = async (method: 'status' | 'listgroups', params?: any) => {
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

  async getDownloadSpeed(): Promise<string> {
    const status = await this.call('status');
    return status['DownloadRate'].toString();
  }

  async getQueue(): Promise<Array<QueueItem>> {
    const queue = await this.call('listgroups');
    return queue.map((item: NZBResponseQueueItem) => ({
      name: item['NZBName'],
      status: item['Status'],
    }));
  }
}
