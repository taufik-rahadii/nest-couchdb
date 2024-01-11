import { Injectable } from '@nestjs/common';
import {
  InjectConnection,
  InjectRepository,
} from 'src/couchdb/decorators/injector.decorator';
import { User } from './user.entity';
import { Repository } from 'src/couchdb/interfaces/repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ServerScope } from 'nano';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT_USER_CHANGES } from './user.event';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    @InjectConnection() private readonly conn: ServerScope,
    private readonly event: EventEmitter2,
  ) {}

  @WebSocketServer()
  private readonly websocketServer: Server;

  async listUserDocs() {
    return await this.repo.find({
      selector: {
        // age: {
        //   $gt: 25,
        // },
      },
      //   use_index: 'findByLastnameIsNull',
      limit: 10,
      skip: 0,
    });
  }

  async createUser(payload: CreateUserDto) {
    return await this.repo.insert(payload as User);
  }

  async createBulk(payloads: CreateUserDto[]) {
    return await this.repo.bulk({
      docs: payloads,
    });
  }

  async updateData(id: string, payload: CreateUserDto) {
    const [data] = (
      await this.repo.find({
        selector: {
          _id: id,
        },
        limit: 1,
      })
    ).docs;

    return await this.repo.insert({
      _id: id,
      _rev: data._rev,
      ...payload,
    });
    return;
  }

  async listenChanges() {
    return new Promise((resolve, reject) => {
      this.repo.changesReader
        .start({
          includeDocs: true,
        })
        .on('change', (change) => {
          console.log(change);
          this.event.emit(EVENT_USER_CHANGES, change.id, change.doc);
        });
    });
  }
}
