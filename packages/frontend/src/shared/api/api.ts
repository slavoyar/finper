/* eslint-disable */
export interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void;
}

export type ProxiedApiClient = ApiClient & {
  cancelAllRequests: () => void;
};

export class ApiClient {
  private static instance: ApiClient;
  private ongoingRequests: Map<string, CancellablePromise<any>> = new Map();
  private baseURL: string;

  private constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  public static getInstance(baseURL?: string): ApiClient {
    if (!ApiClient.instance || ApiClient.instance.baseURL !== baseURL) {
      ApiClient.instance = new ApiClient(baseURL);
    }
    return ApiClient.instance;
  }

  public request<T>(
    method: string,
    url?: string,
    data?: any,
    options: RequestInit = {}
  ): CancellablePromise<T> {
    const constructedUrl = url ? `${this.baseURL}${url}` : this.baseURL;

    const key = this.createRequestKey(method, constructedUrl, data);
    if (this.ongoingRequests.has(key)) {
      return this.ongoingRequests.get(key)!;
    }

    const controller = new AbortController();
    const defaultHeaders = {
      'x-telegram-init-data': Telegram.WebApp.initData,
    };
    const headers = new Headers({ ...defaultHeaders, ...options.headers });

    if (data && !(data instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    const fetchPromise = fetch(constructedUrl, {
      method,
      headers,
      body: data instanceof FormData ? data : JSON.stringify(data),
      signal: controller.signal,
      ...options,
    }).then(async (response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.headers.get('content-type')?.includes('application/json')
        ? response.json()
        : response.text();
    }) as CancellablePromise<T>;

    const cancellablePromise = fetchPromise;
    cancellablePromise.cancel = () => {
      controller.abort();
      this.ongoingRequests.delete(key);
    };

    fetchPromise.finally(() => this.ongoingRequests.delete(key));
    this.ongoingRequests.set(key, cancellablePromise);
    return cancellablePromise;
  }

  public get<T>(url?: string, options?: RequestInit): CancellablePromise<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  public post<T>(data: any, options?: RequestInit): CancellablePromise<T>;
  public post<T>(url: string, data: any, options?: RequestInit): CancellablePromise<T>;
  public post<T>(
    urlOrData: string | any,
    dataOrOptions?: any | RequestInit,
    options?: RequestInit
  ): CancellablePromise<T> {
    let url: string | undefined;
    let data: any;
    let opts: RequestInit | undefined;

    if (typeof urlOrData === 'string') {
      url = urlOrData;
      data = dataOrOptions;
      opts = options;
    } else {
      data = urlOrData;
      opts = dataOrOptions;
    }

    return this.request<T>('POST', url, data, opts);
  }

  public put<T>(data: any, options?: RequestInit): CancellablePromise<T>;
  public put<T>(url: string, data: any, options?: RequestInit): CancellablePromise<T>;
  public put<T>(
    urlOrData: string | any,
    dataOrOptions?: any | RequestInit,
    options?: RequestInit
  ): CancellablePromise<T> {
    let url: string | undefined;
    let data: any;
    let opts: RequestInit | undefined;

    if (typeof urlOrData === 'string') {
      url = urlOrData;
      data = dataOrOptions;
      opts = options;
    } else {
      data = urlOrData;
      opts = dataOrOptions;
    }

    return this.request<T>('PUT', url, data, opts);
  }

  public delete<T>(url?: string, options?: RequestInit): CancellablePromise<T> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  private createRequestKey(method: string, url: string, data?: any): string {
    const dataString = data ? JSON.stringify(data) : '';
    return `${method}:${url}:${dataString}`;
  }
}
