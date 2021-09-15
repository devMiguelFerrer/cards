import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { GenericController } from '../../../Shared/Infrastructure/GenericController';
import { GenericRepository } from '../../../Shared/Infrastructure/GenericRepository';
import { RabbitPublisher } from '../../../Shared/Infrastructure/RabbitPublisher';
import { IUser } from '../../Domain/IUser';
import { UserEntity } from '../Persistence/TypeORM/UserEntity';

@Controller('user')
export class UserController extends GenericController<IUser> {
  constructor(private amqpConnection: AmqpConnection) {
    super(
      new GenericRepository(UserEntity),
      new RabbitPublisher(amqpConnection, 'user'),
    );
  }
}
