import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from './user.entity';
import { InjectRepository } from 'src/couchdb/decorators/injector.decorator';
import { Repository } from 'src/couchdb/interfaces/repository.interface';
import { ActivityLog } from '../activity/entities/activity-log.entity';

export const EVENT_USER_CHANGES = 'user-changes';

@Injectable()
export class UserEvent {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly logRepository: Repository<ActivityLog>,
  ) {}

  private readonly logger = new Logger('UserEvent');

  @OnEvent(EVENT_USER_CHANGES)
  handleUserChanges(id: string, doc: User) {
    this.logger.log('EVENT user-changes');

    this.logger.log(`USER ID: ${id}`);
    this.logger.verbose(`${JSON.stringify(doc)}`);
  }
}
