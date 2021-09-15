import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ICard } from '../../UserStatistics/Domain/ICard';
import { GenericRepository } from './GenericRepository';
import { CardUsed } from 'src/UserStatistics/Application/CardUsed';
import { IUserStatistics } from 'src/UserStatistics/Domain/IUserStatistics';
import { UserStatisticsEntity } from 'src/UserStatistics/Infrastructure/Persistence/TypeORM/UserStaticsEntity';
import { UpdateUserStatistics } from 'src/UserStatistics/Application/UpdateUserStatistics';
import { RemoveUserStatistics } from 'src/UserStatistics/Application/RemoveUserStatistics';
import { CardObtained } from 'src/UserStatistics/Application/CardObtained';

@Injectable()
export class RabbitSubscriber {
  @RabbitSubscribe({
    exchange: 'card.exchanger',
    routingKey: 'obtained.card',
    queue: 'queue.user-statistics.obtained',
  })
  public async obtainedCardHandler(msg: ICard): Promise<void> {
    console.log('[USER STATISTICS] obtainedCardHandler', msg);
    const repository = new GenericRepository<IUserStatistics>(
      UserStatisticsEntity,
    );
    const cardObtained = new CardObtained(repository, msg);
    await cardObtained.dispatch();
  }

  @RabbitSubscribe({
    exchange: 'card.exchanger',
    routingKey: 'update.card',
    queue: 'queue.user-statistics.update',
  })
  public async updatedCardHandler(msg: ICard): Promise<void> {
    console.log('[USER STATISTICS] updatedCardHandler', msg);
    const repository = new GenericRepository<IUserStatistics>(
      UserStatisticsEntity,
    );
    const updateUSerStatistics = new UpdateUserStatistics(repository, msg);
    await updateUSerStatistics.dispatch();
  }

  @RabbitSubscribe({
    exchange: 'card.exchanger',
    routingKey: 'remove.card',
    queue: 'queue.user-statistics.remove',
  })
  public async removedCardHandler(msg: ICard): Promise<void> {
    console.log('[USER STATISTICS] removedCardHandler', msg);
    const repository = new GenericRepository<IUserStatistics>(
      UserStatisticsEntity,
    );
    const removeUserStatistics = new RemoveUserStatistics(repository, msg);
    await removeUserStatistics.dispatch();
  }

  @RabbitSubscribe({
    exchange: 'card.exchanger',
    routingKey: 'used.card',
    queue: 'queue.user-statistics.used',
  })
  public async cardUsedHandler(msg: ICard): Promise<void> {
    console.log('[USER STATISTICS] cardUsedHandler', msg);
    const repository = new GenericRepository<IUserStatistics>(
      UserStatisticsEntity,
    );
    const cardUsed = new CardUsed(repository, msg);
    await cardUsed.dispatch();
  }
}
