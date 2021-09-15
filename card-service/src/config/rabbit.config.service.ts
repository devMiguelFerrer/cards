import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleConfigFactory } from '@golevelup/nestjs-modules/lib/dynamicModules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export default class RabbitConfigService
  implements ModuleConfigFactory<RabbitMQConfig>
{
  constructor(private configService: ConfigService) {}

  createModuleConfig(): RabbitMQConfig {
    const rabbitUrl = this.configService.get<string>('RABBIT_URL');
    const userExchanger = this.configService.get<string>('RABBIT_USER_EXCHANGE');
    const cardExchanger = this.configService.get<string>('RABBIT_CARD_EXCHANGE');

    return {
      exchanges: [
        {
          name: userExchanger,
          type: 'topic',
        },
        {
          name: cardExchanger,
          type: 'topic',
        },
      ],
      uri: [rabbitUrl],
      connectionInitOptions: { wait: false },
    };
  }
}
