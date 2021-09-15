import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import RabbitConfigService from './config/rabbit.config.service';
import TypeOrmConfigService from './config/typeorm.config.service';
import { RabbitSubscriber } from './Shared/Infrastructure/RabbitSubcriber';
import { CardController } from './Card/Infrastructure/Controller/CardController';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useClass: RabbitConfigService,
    }),
  ],
  controllers: [CardController],
  providers: [RabbitSubscriber],
})
export class AppModule {}
