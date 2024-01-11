import { CouchDBConfig } from '../interfaces/config.interface';
import * as nano from 'nano';

export class CouchDBConnectionFactory {
  public static async create(config: CouchDBConfig) {
    const connection = nano({
      url: config.url,
      cookie: config.cookieSession,
      log: config.log,
    });

    await connection.auth(config.username, config.password);

    return connection;
  }
}
