import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { CouchDBConfig } from './interfaces/config.interface';
import { getConnectionToken, getRepositoryFactoryToken } from './couchdb.util';
import { CouchDBConnectionFactory } from './factories/connection.factory';
import { CouchDBRepositoryFactory } from './factories/repository.factory';
import { ServerScope } from 'nano';

@Global()
@Module({})
export class CouchDBCoreModule {
  static async forRoot(config: CouchDBConfig): Promise<DynamicModule> {
    const providers = await this.createConnectionProvider(config);
    return {
      providers,
      module: CouchDBCoreModule,
      exports: providers,
    };
  }

  private static async createConnectionProvider(
    config: CouchDBConfig,
  ): Promise<Provider[]> {
    const connectionVal = await CouchDBConnectionFactory.create(config);
    const connection: Provider = {
      provide: getConnectionToken(),
      useFactory: () => connectionVal,
    };

    const repositoryFactory: Provider = {
      provide: getRepositoryFactoryToken(),
      useFactory: () => CouchDBRepositoryFactory.create(connectionVal, config),
    };

    return [connection, repositoryFactory];
  }
}
