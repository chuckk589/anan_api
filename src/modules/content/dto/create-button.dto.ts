import { OmitType, PickType } from '@nestjs/swagger';
import { RawButton } from './retrieve-button.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateButtonDto extends OmitType(RawButton, ['id']) {
  @IsString()
  @IsOptional()
  text_en?: string;
}
export class CreateButtonEnDto extends PickType(CreateButtonDto, ['text_en']) {
  @IsNumber()
  @IsOptional()
  original_id?: number;
}
