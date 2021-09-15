import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { GenericController } from '../../../Shared/Infrastructure/GenericController';
import { GenericRepository } from '../../../Shared/Infrastructure/GenericRepository';
import { RabbitPublisher } from '../../../Shared/Infrastructure/RabbitPublisher';
import { ICard } from '../../Domain/ICard';
import { CardEntity } from '../Persistence/TypeORM/CardEntity';

@Controller('card')
export class CardController extends GenericController<ICard> {
  constructor(private amqpConnection: AmqpConnection) {
    super(
      new GenericRepository(CardEntity),
      new RabbitPublisher(amqpConnection, 'card'),
    );
  }
}
