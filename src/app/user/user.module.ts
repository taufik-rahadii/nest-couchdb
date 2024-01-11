import { Module } from '@nestjs/common';
import { CouchDBModule } from 'src/couchdb/couchdb.module';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ActivityModule } from '../activity/activity.module';
import { UserEvent } from './user.event';
import { UserGateway } from './user.gateway';

@Module({
  imports: [CouchDBModule.forFeature([User]), ActivityModule],
  providers: [UserService, UserEvent, UserGateway],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
