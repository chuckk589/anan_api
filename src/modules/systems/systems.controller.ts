import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateLevelRateDto } from '../users/dto/update-level-rate.dto';
import { UpdateRateDto } from '../users/dto/update-rate.dto';
import { UpdateSystemDto } from './dto/update-system.dto';

@ApiTags('systems')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('systems')
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}

  @ApiOperation({ summary: 'Получить системные настройки (system_settings table)' })
  @Get('/getAll')
  getAll() {
    return this.systemsService.getAll();
  }
  @ApiOperation({ summary: 'Получить основные системные настройки под id = 1' })
  @Get('/get')
  get() {
    return this.systemsService.get();
  }
  @ApiOperation({ summary: 'Получить системные настройки по айди' })
  @Get('/get/:id')
  getOne(@Param('id') id: string) {
    return this.systemsService.getOne(+id);
  }
  @ApiOperation({ summary: 'Обновляет основные системные настройки' })
  @Patch('/update')
  update(@Body() body: UpdateSystemDto) {
    return this.systemsService.update(body);
  }
  @ApiOperation({ summary: 'Обновляет глобальную процентную ставку' })
  @Patch('/updateRate/:id')
  updateRate(@Param('id') id: string, @Body() body: UpdateRateDto) {
    return this.systemsService.updateRate(+id, body);
  }
  @ApiOperation({ summary: 'Обновляет глобальную процентную ставку, зависимую от уровня ступени реферала' })
  @Patch('/updateLevelRate/:id')
  updateLevelRate(@Param('id') id: string, @Body() body: UpdateLevelRateDto) {
    return this.systemsService.updateLevelRate(+id, body);
  }
}
