import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  list() {
    return this.service.listUserDocs();
  }

  @Post()
  insert(@Body() payload: CreateUserDto) {
    return this.service.createUser(payload);
  }

  @Post('bulk')
  bulkInsert(@Body() payload: CreateUserDto[]) {
    return this.service.createBulk(payload);
  }

  @Get('stream')
  listenChanges() {
    return this.service.listenChanges();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: CreateUserDto) {
    return this.service.updateData(id, payload);
  }
}
