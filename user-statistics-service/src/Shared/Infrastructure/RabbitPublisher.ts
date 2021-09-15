import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EQueueEventType } from '../Domain/EQueueEventType';
import { IPublisher } from '../Domain/IPublisher';

export class RabbitPublisher<T> implements IPublisher<T> {
  constructor(
    private amqpConnection: AmqpConnection,
    private channel: string,
  ) {}
  publish(data: T, event: EQueueEventType): Promise<void> {
    return this.amqpConnection.publish(
      `${this.channel}.exchanger`,
      `${event}.${this.channel}`,
      data,
    );
  }
}
