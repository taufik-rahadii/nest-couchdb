import { Module } from '@nestjs/common';
import { CouchDBModule } from 'src/couchdb/couchdb.module';
import { UserModule } from './user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    CouchDBModule.forRoot({
      username: 'couchdb',
      password: 'password',
      url: 'http://127.0.0.1:5984',
      sync: true,
    }),

    EventEmitterModule.forRoot(),

    UserModule,
  ],
})
export class AppModule {}
