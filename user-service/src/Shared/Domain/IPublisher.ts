import { EQueueEventType } from './EQueueEventType';

export interface IPublisher<T> {
  publish(data: T, event: EQueueEventType): Promise<void>;
}
