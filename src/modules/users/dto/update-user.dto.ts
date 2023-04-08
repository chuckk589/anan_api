import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username: string;
  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  first_name: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  status: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  referrer_id: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  balance: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  earned: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  level_id: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  invest_balance: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  count_annual_payment: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  bot_id: number;
  @ApiPropertyOptional({ enum: ['ru', 'en'] })
  @IsOptional()
  @IsIn(['en', 'ru'])
  language: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  activation_limit: number;
}
