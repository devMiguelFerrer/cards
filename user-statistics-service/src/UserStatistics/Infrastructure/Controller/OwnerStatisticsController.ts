import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { IUserStatistics } from 'src/UserStatistics/Domain/IUserStatistics';
import { GenericController } from '../../../Shared/Infrastructure/GenericController';
import { GenericRepository } from '../../../Shared/Infrastructure/GenericRepository';
import { RabbitPublisher } from '../../../Shared/Infrastructure/RabbitPublisher';
import { UserStatisticsEntity } from '../Persistence/TypeORM/UserStaticsEntity';

@Controller('user-statistics')
export class OwnerStatisticsController extends GenericController<IUserStatistics> {
  constructor(private amqpConnection: AmqpConnection) {
    super(
      new GenericRepository(UserStatisticsEntity),
      new RabbitPublisher(amqpConnection, 'user-statistics'),
    );
  }
}
