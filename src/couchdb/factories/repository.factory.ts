import nano from 'nano';
import { CouchDBConfig } from '../interfaces/config.interface';
import { Repository } from '../interfaces/repository.interface';
import { getEntityMetadata } from '../couchdb.util';
import { CouchDBRepositoryMixin } from './repository.mixin';

export class CouchDBRepositoryFactory {
  constructor(
    private connection: nano.ServerScope,
    private config: CouchDBConfig,
  ) {}

  static create(connection: nano.ServerScope, config: CouchDBConfig) {
    return new CouchDBRepositoryFactory(connection, config);
  }

  public async create<T>(entity: T): Promise<Repository<T>> {
    const dbName = this.getDbName(entity);
    await this.checkDatabase(dbName);
    const driver = this.connection.db.use<T>(dbName);

    return new (CouchDBRepositoryMixin<T>(driver, entity))();
  }

  private getDbName(entity: any) {
    const dbName = getEntityMetadata(entity);

    if (!dbName) throw new Error(`Entity ${entity.name} using invalid name`);

    return dbName;
  }

  private async checkDatabase(name: string): Promise<boolean> {
    try {
      await this.connection.db.get(name);

      return true;
    } catch (error) {
      if (this.config.sync) return await this.createDatabase(name);

      throw error;
    }
  }

  private async createDatabase(name: string): Promise<boolean> {
    await this.connection.db.create(name);

    return true;
  }
}
