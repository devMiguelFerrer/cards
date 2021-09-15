import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { OwnerStatisticsEntity } from 'src/OwnerStatistics/Infrastructure/Persistence/TypeORM/OwnerStaticsEntity';

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<TypeORMDriver>('DB_TYPE'),
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('MYSQL_PORT'),
      username: this.configService.get<string>('MYSQL_USER'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
      autoLoadEntities: true,
      synchronize: true,
      entities: [OwnerStatisticsEntity],
      name: 'mysql-typeorm',
    };
  }
}

export type TypeORMDriver =
  | 'mysql'
  | 'mariadb'
  | 'postgres'
  | 'cockroachdb'
  | 'sqlite'
  | 'mssql'
  | 'oracle'
  | 'mongodb'
  | 'cordova'
  | 'react-native'
  | 'expo'
  | 'nativescript';
