import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { RateObj } from './retrieve-user.dto';

export class UpdateRateDto {
  @IsObject()
  @ValidateNested()
  @Type(() => RateObj)
  rate: RateObj;
}
