import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitSubscriber {
  @RabbitSubscribe({
    exchange: 'user.exchanger',
    routingKey: 'add.user',
    queue: 'queue.user.add',
  })
  public async addHandler(msg: any): Promise<null> {
    console.log('[USER] addHandler', msg);
    return null;
  }

  @RabbitSubscribe({
    exchange: 'user.exchanger',
    routingKey: 'update.user',
    queue: 'queue.user.update',
  })
  public async updateHandler(msg: any): Promise<null> {
    console.log('[USER] updateHandler', msg);
    return null;
  }

  @RabbitSubscribe({
    exchange: 'user.exchanger',
    routingKey: 'remove.user',
    queue: 'queue.user.remove',
  })
  public async removeHandler(msg: any): Promise<null> {
    console.log('[USER] removeHandler', msg);
    return null;
  }
}
