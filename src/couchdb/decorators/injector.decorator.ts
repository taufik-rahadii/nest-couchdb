import { Inject } from '@nestjs/common';
import { getConnectionToken, getRepositoryToken } from '../couchdb.util';

export const InjectRepository = (target: Function): ParameterDecorator =>
  Inject(getRepositoryToken(target));

export const InjectConnection = (): ParameterDecorator =>
  Inject(getConnectionToken());
