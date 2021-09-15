import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ICard } from '../../OwnerStatistics/Domain/ICard';
import { AddGeneric } from '../Application/AddGeneric';
import { GenericRepository } from './GenericRepository';
import { OwnerStatisticsEntity } from 'src/OwnerStatistics/Infrastructure/Persistence/TypeORM/OwnerStaticsEntity';
import { IOwnerStatistics } from 'src/OwnerStatistics/Domain/IOwnerStatistics';
import { IOwnerStatisticsDto } from 'src/OwnerStatistics/Domain/IOwnerStatisticsDto';
import { UpdateGeneric } from '../Application/UpdateGeneric';
import { UpdateOwnerStatistics } from 'src/OwnerStatistics/Application/UpdateOwnerStatistics';
import { RemoveOwnerStatistics } from 'src/OwnerStatistics/Application/RemoveOwnerStatistics';
import { CardUsed } from 'src/OwnerStatistics/Application/CardUsed';

@Injectable()
export class RabbitSubscriber {
  @RabbitSubscribe({
    exchange: 'card.exchanger',
    routingKey: 'add.card',
    queue: 'queue.owner-statistics.add',
  })
  public async addHandler(msg: ICard): Promise<void> {
    console.log('[OWNER STATISTICS] addHandler', msg);
    const repository = new GenericRepository<IOwnerStatistics>(
      OwnerStatisticsEntity,
    );
    const ownerStatistics: IOwnerStatisticsDto = {
      cardId: msg.id,
      cardImage: msg.image,
      cardName: msg.name,
      cardRarity: msg.rarity,
      cardUses: 0,
      ownerId: msg.ownerId,
    };
    const addGeneric = new AddGeneric<IOwnerStatisticsDto>(
      repository,
      ownerStatistics,
    );
    const created = await addGeneric.dispatch();
  }

  @RabbitSubscribe({
    exchange: 'card.exchanger',
    routingKey: 'update.card',
    queue: 'queue.owner-statistics.update',
  })
  public async updateHandler(msg: ICard): Promise<void> {
    console.log('[OWNER STATISTICS] updateHandler', msg);
    const repository = new GenericRepository<IOwnerStatistics>(
      OwnerStatisticsEntity,
    );
    const updateOwnerStatistics = new UpdateOwnerStatistics(repository, msg);
    await updateOwnerStatistics.dispatch();
  }

  @RabbitSubscribe({
    exchange: 'card.exchanger',
    routingKey: 'remove.card',
    queue: 'queue.owner-statistics.remove',
  })
  public async removeHandler(msg: ICard): Promise<void> {
    console.log('[OWNER STATISTICS] removeHandler', msg);
    const repository = new GenericRepository<IOwnerStatistics>(
      OwnerStatisticsEntity,
    );
    const removeOwnerStatistics = new RemoveOwnerStatistics(repository, msg);
    await removeOwnerStatistics.dispatch();
  }

  @RabbitSubscribe({
    exchange: 'card.exchanger',
    routingKey: 'used.card',
    queue: 'queue.owner-statistics.used',
  })
  public async cardUsedHandler(msg: ICard): Promise<void> {
    console.log('[OWNER STATISTICS] cardUsedHandler', msg);
    const repository = new GenericRepository<IOwnerStatistics>(
      OwnerStatisticsEntity,
    );
    const cardUsed = new CardUsed(repository, msg);
    await cardUsed.dispatch();
  }
}
