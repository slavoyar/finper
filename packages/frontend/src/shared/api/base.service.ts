import { ApiClient, CancellablePromise, ProxiedApiClient } from './api';

export abstract class BaseService {
  protected api: ProxiedApiClient;
  private trackedRequests: CancellablePromise<any>[] = [];

  constructor(baseURL: string = '') {
    const apiInstance = ApiClient.getInstance(baseURL);

    this.api = new Proxy(apiInstance, {
      get: (target, prop, receiver) => {
        if (prop === 'cancelAllRequests') {
          return () => this.cancelAllRequests();
        }

        if (['get', 'post', 'put', 'delete'].includes(prop as string)) {
          return (...args: any[]) => {
            const originalMethod = (target as any)[prop];
            const promise = originalMethod.apply(target, args);

            // Extract options from arguments
            const options = args[args.length - 1] || {};

            if (!options.doNotCancel) {
              this.trackRequest(promise);
            }

            return promise;
          };
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as ProxiedApiClient;
  }

  private trackRequest(promise: CancellablePromise<any>) {
    this.trackedRequests.push(promise);
    promise.finally(() => {
      this.trackedRequests = this.trackedRequests.filter((p) => p !== promise);
    });
  }

  public cancelAllRequests() {
    this.trackedRequests.forEach((request) => request.cancel());
    this.trackedRequests = [];
  }
}
