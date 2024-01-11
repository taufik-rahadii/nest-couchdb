import { Entity } from '../../couchdb/decorators/entity.decorator';

@Entity('users')
export class User {
  _id: string;
  _rev?: string;
  firstname: string;
  lastname?: string;
  age: number;
  balanceIn: number[];
  balanceOut?: number[];
}
