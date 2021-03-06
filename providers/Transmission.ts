import {
  ServiceProvider,
  QueueItem,
  TransmissionRequest,
  TransmissionResponse,
  TransmissionResponseQueueItem,
  TransmissionSessionStatistics,
  TestResult,
} from '../pages/api/status/types';
import axios, { AxiosError } from 'axios';

const statusValues: { [key: number]: string } = {
  0: 'Stopped',
  1: 'Check waiting',
  2: 'Checking',
  3: 'Download waiting',
  4: 'Downloading',
  5: 'Seed waiting',
  6: 'Seeding',
};

type TransmissionProps = {
  host: string;
};

export class Transmission extends ServiceProvider {
  host;
  csrfToken: string = '';

  static params = ['host'];
  public static logo = '/transmission-logo.png';

  constructor({ host }: TransmissionProps) {
    super();
    this.host = host;
  }

  private handleCSRFError(response: TransmissionResponse<AxiosError>) {
    this.csrfToken = response.headers['x-transmission-session-id'];
  }

  private call = async <T = any>(
    method: 'session-stats' | 'torrent-get' | 'torrent-stop' | 'torrent-start',
    params?: any,
  ): Promise<T | null> => {
    const url = `http://${this.host}/transmission/rpc`;

    const payload: TransmissionRequest = {
      method: method,
    };

    if (params) {
      payload.arguments = params;
    }

    let response;
    try {
      response = await axios.post<TransmissionResponse<T>>(url, payload, {
        headers: {
          'X-Transmission-Session-Id': this.csrfToken,
        },
      });
    } catch (e) {
      if (e.response?.status === 409) {
        this.handleCSRFError(e.response);
        response = await axios.post<TransmissionResponse<T>>(url, payload, {
          headers: {
            'X-Transmission-Session-Id': this.csrfToken,
          },
        });
      } else {
        throw e;
      }
    }
    return response?.data.arguments || null;
  };

  async getDownloadSpeed(): Promise<number> {
    const status = await this.call<TransmissionSessionStatistics>(
      'session-stats',
    );
    return status?.downloadSpeed || 0;
  }

  async getQueue(): Promise<Array<QueueItem>> {
    const queue = await this.call<TransmissionResponseQueueItem>(
      'torrent-get',
      {
        fields: ['name', 'status'],
      },
    );

    return (
      queue?.torrents.map(
        (torrent): QueueItem => ({
          ...torrent,
          status: statusValues[torrent.status],
        }),
      ) || []
    );
  }

  async pause(): Promise<void> {
    await this.call('torrent-stop');
  }

  async resume(): Promise<void> {
    await this.call('torrent-start');
  }

  public static serviceName = 'Transmission';
  public static fields = ['host'];
  public static imageUrl = '/transmission-logo.png';

  async test(): Promise<TestResult> {
    try {
      await this.getDownloadSpeed();
      return { pass: true };
    } catch (e) {
      if (['ENOTFOUND', 'ECONNREFUSED'].includes(e.code)) {
        return { pass: false, message: 'Could not connect to host' };
      }
      return { pass: false, message: e.message };
    }
  }
}
