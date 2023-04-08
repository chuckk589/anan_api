import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('admins')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: 'Отдает список всех администраторов (admin_users table)' })
  @Get('/getAll')
  getAll() {
    return this.adminsService.getAll();
  }
  @ApiOperation({ summary: 'Отдает данные администратора по айди, включая персональные (user table)' })
  @Get('/get/:user_id')
  get(@Param('user_id') user_id: string) {
    return this.adminsService.get(+user_id);
  }
  @ApiOperation({
    summary: 'Создает нового админа, где user_id должен существовать в таблице пользователей, как и parent (может быть null)',
  })
  @Post('/create')
  create(@Body() body: CreateAdminDto) {
    return this.adminsService.create(body);
  }
  @ApiOperation({ summary: 'Обновляет права администратора' })
  @Patch('/update/:user_id')
  update(@Param('user_id') user_id: string, @Body() body: UpdateAdminDto) {
    return this.adminsService.update(+user_id, body);
  }
  @ApiOperation({ summary: 'Удаляет администратора по юзер айди' })
  @Delete('/delete/:user_id')
  remove(@Param('user_id') user_id: string) {
    return this.adminsService.remove(+user_id);
  }
}
