import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateLevelRateDto } from './dto/update-level-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RetrieveUserDto } from './dto/retrieve-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/getAll')
  @ApiOperation({ summary: 'Отдает список всех пользователей (user table)' })
  @ApiResponse({ status: 200, type: RetrieveUserDto, isArray: true })
  getAll() {
    return this.usersService.getAll();
  }
  @Get('/get/:id')
  @ApiOperation({ summary: 'Отдает пользователя по айди' })
  @ApiResponse({ status: 200, type: RetrieveUserDto, isArray: true })
  get(@Param('id') id: string) {
    return this.usersService.get(+id);
  }
  @Patch('/update/:id')
  @ApiOperation({ summary: 'Обновляет данные пользователя по айди' })
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }
  @ApiOperation({ summary: 'Обновляет процентную ставку пользователя' })
  @Patch('/updateRate/:id')
  updateRate(@Param('id') id: string, @Body() body: UpdateRateDto) {
    return this.usersService.updateRate(+id, body);
  }
  @ApiOperation({ summary: 'Обновляет уровень пользователя' })
  @Patch('/updateLevelRate/:id')
  updateLevelRate(@Param('id') id: string, @Body() body: UpdateLevelRateDto) {
    return this.usersService.updateLevelRate(+id, body);
  }
}
