import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitSubscriber {
  @RabbitSubscribe({
    exchange: 'user.exchanger',
    routingKey: 'add.user',
    queue: 'queue.card.add',
  })
  public async addHandler(msg: any): Promise<null> {
    console.log('[CARD] addHandler', msg);
    return null;
  }

  @RabbitSubscribe({
    exchange: 'user.exchanger',
    routingKey: 'update.user',
    queue: 'queue.card.update',
  })
  public async updateHandler(msg: any): Promise<null> {
    console.log('[CARD] updateHandler', msg);
    return null;
  }

  @RabbitSubscribe({
    exchange: 'user.exchanger',
    routingKey: 'remove.user',
    queue: 'queue.card.remove',
  })
  public async removeHandler(msg: any): Promise<null> {
    console.log('[CARD] removeHandler', msg);
    return null;
  }
}
