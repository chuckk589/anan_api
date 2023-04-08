import { OmitType, PickType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { RawText } from './retrieve-text.dto';

export class CreateTextDto extends OmitType(RawText, ['id']) {
  @IsString()
  @IsOptional()
  text_en?: string;
}
export class CreateTextEnDto extends PickType(CreateTextDto, ['text_en']) {
  @IsNumber()
  @IsOptional()
  original_id?: number;
}
