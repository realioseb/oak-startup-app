import { IProvider } from './provider-interface';
import { StorageProvider } from './storage-provider';
import { RemoteProvider } from './remote-provider';

export { getRandomFact } from './facts';

export const api: IProvider =
  process.env.REACT_APP_API === 'remote'
    ? new RemoteProvider()
    : new StorageProvider();
