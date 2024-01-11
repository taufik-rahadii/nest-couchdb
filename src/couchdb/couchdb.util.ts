import {
  COUCHDB_CONNECTION_TOKEN,
  COUCHDB_ENTITY_METADATA,
  COUCHDB_REPOSITORY_FACTORY_TOKEN,
} from './couchdb.constant';

export const getRepositoryToken = (target: Function): string =>
  `${target.name}_REPOSITORY_TOKEN`;

export const getConnectionToken = (): string => COUCHDB_CONNECTION_TOKEN;
export const getRepositoryFactoryToken = (): string =>
  COUCHDB_REPOSITORY_FACTORY_TOKEN;
export const getEntityMetadata = <T extends Function>(entity: T): string =>
  Reflect.getMetadata(COUCHDB_ENTITY_METADATA, entity);
