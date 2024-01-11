import { Module } from '@nestjs/common';
import { CouchDBModule } from 'src/couchdb/couchdb.module';
import { ActivityLog } from './entities/activity-log.entity';

@Module({
  imports: [CouchDBModule.forFeature([ActivityLog])],
  exports: [CouchDBModule],
})
export class ActivityModule {}
