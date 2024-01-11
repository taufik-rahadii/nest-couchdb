import { DocumentScope } from 'nano';
import { Repository } from '../interfaces/repository.interface';

export const CouchDBRepositoryMixin = <T>(
  driver: DocumentScope<T>,
  entity: T,
): Repository<T> => {
  class CouchDBRepository {
    public entity: T;

    constructor() {
      this.entity = entity;
    }
  }

  Object.assign(CouchDBRepository.prototype, driver);

  return CouchDBRepository as any;
};
