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
    const exchangerName = this.configService.get<string>('RABBIT_USER_EXCHANGE');

    return {
      exchanges: [
        {
          name: exchangerName,
          type: 'topic',
        },
      ],
      uri: [rabbitUrl],
      connectionInitOptions: { wait: false },
    };
  }
}
