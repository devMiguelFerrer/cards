import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { IOwnerStatistics } from 'src/OwnerStatistics/Domain/IOwnerStatistics';
import { GenericController } from '../../../Shared/Infrastructure/GenericController';
import { GenericRepository } from '../../../Shared/Infrastructure/GenericRepository';
import { RabbitPublisher } from '../../../Shared/Infrastructure/RabbitPublisher';
import { OwnerStatisticsEntity } from '../Persistence/TypeORM/OwnerStaticsEntity';

@Controller('owner-statistics')
export class OwnerStatisticsController extends GenericController<IOwnerStatistics> {
  constructor(private amqpConnection: AmqpConnection) {
    super(
      new GenericRepository(OwnerStatisticsEntity),
      new RabbitPublisher(amqpConnection, 'user-statistics'),
    );
  }
}
