import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { LevelRateObj } from './retrieve-user.dto';

export class UpdateLevelRateDto {
  @IsArray()
  @ValidateNested()
  @Type(() => LevelRateObj)
  rate: LevelRateObj[];
}
