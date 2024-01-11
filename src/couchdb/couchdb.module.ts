import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CouchDBConfig } from './interfaces/config.interface';
import { CouchDBCoreModule } from './couchdb-core.module';
import { getRepositoryFactoryToken, getRepositoryToken } from './couchdb.util';
import { CouchDBRepositoryFactory } from './factories/repository.factory';

@Module({})
export class CouchDBModule {
  static forRoot(config: CouchDBConfig): DynamicModule {
    return {
      module: CouchDBModule,
      imports: [CouchDBCoreModule.forRoot(config)],
    };
  }

  static forFeature(entities: Function[]): DynamicModule {
    const providers = this.provideRepositories(entities);
    return {
      module: CouchDBModule,
      providers,
      exports: providers,
    };
  }

  private static createRepositoryProvider(entity: Function): Provider {
    return {
      provide: getRepositoryToken(entity),
      useFactory: async (repoFactory: CouchDBRepositoryFactory) =>
        repoFactory.create(entity),
      inject: [getRepositoryFactoryToken()],
    };
  }

  private static provideRepositories(entities: Function[]): Provider[] {
    const providers = entities.map((e) => this.createRepositoryProvider(e));

    return providers;
  }
}
