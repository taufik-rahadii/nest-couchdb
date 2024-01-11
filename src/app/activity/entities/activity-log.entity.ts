import { User } from 'src/app/user/user.entity';
import { Entity } from 'src/couchdb/decorators/entity.decorator';

@Entity('activities')
export class ActivityLog {
  _id: string;
  _rev?: string;
  _user: User;
  activityName: string;
  description?: string;
  createdAt: Date;
}
