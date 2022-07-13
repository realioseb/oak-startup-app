import { IProvider } from './provider-interface';
import { StorageProvider } from './storage-provider';
import { RemoteProvider } from './remote-provider';

export { getRandomFact } from './facts';

console.log(process.env.REACT_APP_API);
console.log(process.env.REACT_APP_FACTS_URL);
console.log(process.env.REACT_APP_REMOTE_API);
export const api: IProvider =
  process.env.REACT_APP_API === 'remote'
    ? new RemoteProvider()
    : new StorageProvider();
