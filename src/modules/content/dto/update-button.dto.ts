import { PartialType, PickType } from '@nestjs/swagger';
import { CreateButtonDto } from './create-button.dto';

export class UpdateButtonDto extends PartialType(CreateButtonDto) {}
export class UpdateButtonEnDto extends PickType(CreateButtonDto, ['text_en']) {}
