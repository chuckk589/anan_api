import { PartialType, PickType } from '@nestjs/swagger';
import { CreateTextDto } from './create-text.dto';

export class UpdateTextDto extends PartialType(CreateTextDto) {}
export class UpdateTextEnDto extends PickType(CreateTextDto, ['text_en']) {}
