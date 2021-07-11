import {
  NZBGetRequest,
  NZBGetQueueItem,
  NZBResponseQueueItem,
  ServiceProvider,
} from '../types';
import axios from 'axios';

export class NZBGetProvider implements ServiceProvider {
  host;
  username;
  password;

  constructor(host: string, username: string, password: string) {
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
    return status['DownloadRate'];
  }

  async getQueue(): Promise<Array<NZBGetQueueItem>> {
    const queue = await this.call('listgroups');
    return queue.map((item: NZBResponseQueueItem) => ({
      name: item['NZBName'],
      niceName: item['NZBNicename'],
      status: item['Status'],
    }));
  }
}
