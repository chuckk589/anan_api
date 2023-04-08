import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { CreateButtonDto } from './dto/create-button.dto';
import { UpdateButtonDto } from './dto/update-button.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('content')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  //Texts
  @ApiOperation({ summary: 'Отдает все оригинальные текста (text table) и переведенные на английский (text_en table)' })
  @Get('/texts/getAll')
  getAll() {
    return this.contentService.getAll();
  }
  @ApiOperation({ summary: 'Отдает оригинальный текст и переведенный на английский по айди' })
  @Get('/texts/get/:id')
  get(@Param('id') id: string) {
    return this.contentService.get(+id);
  }
  @ApiOperation({ summary: 'Отдает оригинальный текст по айди' })
  @Get('/texts/getRu/:id')
  getRu(@Param('id') id: string) {
    return this.contentService.getRu(+id);
  }
  @ApiOperation({ summary: 'Отдает текст на английском языке по айди' })
  @Get('/texts/getEn/:id')
  getEn(@Param('id') id: string) {
    return this.contentService.getEn(+id);
  }
  @ApiOperation({
    summary: 'Создает оригинальный текст и переведенный на английский, с ссылкой (original_id) на созданный оригинальный текст.',
  })
  @Post('/texts/create')
  create(@Body() body: CreateTextDto) {
    return this.contentService.create(body);
  }
  @ApiOperation({ summary: 'Создает оригинальный текст' })
  @Post('/texts/createRu')
  createRu(@Body() body: CreateTextDto) {
    return this.contentService.createRu(body);
  }
  @ApiOperation({ summary: 'Создает текст на английском языке' })
  @Post('/texts/createEn')
  createEn(@Body() body: CreateTextDto) {
    return this.contentService.createEn(body);
  }
  @ApiOperation({ summary: 'Обновляет оригинальный текст и переведенный на английский' })
  @Patch('/texts/update/:id')
  update(@Param('id') id: string, @Body() body: UpdateTextDto) {
    return this.contentService.update(+id, body);
  }
  @ApiOperation({ summary: 'Обновляет оригинальный текст' })
  @Patch('/texts/updateRu/:id')
  updateRu(@Param('id') id: string, @Body() body: UpdateTextDto) {
    return this.contentService.updateRu(+id, body);
  }
  @ApiOperation({ summary: 'Обновляет текст на английском языке' })
  @Patch('/texts/updateEn/:id')
  updateEn(@Param('id') id: string, @Body() body: UpdateTextDto) {
    return this.contentService.updateEn(+id, body);
  }
  @ApiOperation({ summary: 'Удаляет оригинальный текст и переведенный на английский' })
  @Delete('/texts/delete/:id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }
  @ApiOperation({ summary: 'Удаляет оригинальный текст' })
  @Delete('/texts/deleteRu/:id')
  removeRu(@Param('id') id: string) {
    return this.contentService.removeRu(+id);
  }
  @ApiOperation({ summary: 'Удаляет текст на английском языке' })
  @Delete('/texts/deleteEn/:id')
  removeEn(@Param('id') id: string) {
    return this.contentService.removeEn(+id);
  }

  //Buttons
  @ApiOperation({ summary: 'Отдает все оригинальные кнопки (button table) и переведенные на английский (button_en table)' })
  @Get('/buttons/getAll')
  getAllButtons() {
    return this.contentService.getAllButtons();
  }
  @ApiOperation({ summary: 'Отдает оригинальную кнопку и переведенную на английский по айди' })
  @Get('/buttons/get/:id')
  getButton(@Param('id') id: string) {
    return this.contentService.getButton(+id);
  }
  @ApiOperation({ summary: 'Отдает оригинальную кнопку по айди' })
  @Get('/buttons/getRu/:id')
  getButtonRu(@Param('id') id: string) {
    return this.contentService.getButtonRu(+id);
  }
  @ApiOperation({ summary: 'Отдает кнопку на английском языке по айди' })
  @Get('/buttons/getEn/:id')
  getButtonEn(@Param('id') id: string) {
    return this.contentService.getButtonEn(+id);
  }
  @ApiOperation({
    summary: 'Создает оригинальную кнопку и переведенную на английский, с ссылкой (original_id) на созданную оригинальную кнопку.',
  })
  @Post('/buttons/create')
  createButton(@Body() body: CreateButtonDto) {
    return this.contentService.createButton(body);
  }
  @ApiOperation({ summary: 'Создает оригинальную кнопку' })
  @Post('/buttons/createRu')
  createButtonRu(@Body() body: CreateButtonDto) {
    return this.contentService.createButtonRu(body);
  }
  @ApiOperation({ summary: 'Создает кнопку на английском языке' })
  @Post('/buttons/createEn')
  createButtonEn(@Body() body: CreateButtonDto) {
    return this.contentService.createButtonEn(body);
  }
  @ApiOperation({ summary: 'Обновляет оригинальную кнопку и переведенную на английский' })
  @Patch('/buttons/update/:id')
  updateButton(@Param('id') id: string, @Body() body: UpdateButtonDto) {
    return this.contentService.updateButton(+id, body);
  }
  @ApiOperation({ summary: 'Обновляет оригинальную кнопку' })
  @Patch('/buttons/updateRu/:id')
  updateButtonRu(@Param('id') id: string, @Body() body: UpdateButtonDto) {
    return this.contentService.updateButtonRu(+id, body);
  }
  @ApiOperation({ summary: 'Обновляет кнопку на английском языке' })
  @Patch('/buttons/updateEn/:id')
  updateButtonEn(@Param('id') id: string, @Body() body: UpdateButtonDto) {
    return this.contentService.updateButtonEn(+id, body);
  }
  @ApiOperation({ summary: 'Удаляет оригинальную кнопку и переведенную на английский' })
  @Delete('/buttons/delete/:id')
  removeButton(@Param('id') id: string) {
    return this.contentService.removeButton(+id);
  }
  @ApiOperation({ summary: 'Удаляет оригинальную кнопку' })
  @Delete('/buttons/deleteRu/:id')
  removeButtonRu(@Param('id') id: string) {
    return this.contentService.removeButtonRu(+id);
  }
  @ApiOperation({ summary: 'Удаляет кнопку на английском языке' })
  @Delete('/buttons/deleteEn/:id')
  removeButtonEn(@Param('id') id: string) {
    return this.contentService.removeButtonEn(+id);
  }
}
