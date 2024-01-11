import { COUCHDB_ENTITY_METADATA } from '../couchdb.constant';

export const Entity = (name: string) => (target: Object) => {
  Reflect.defineMetadata(COUCHDB_ENTITY_METADATA, name, target);
};
