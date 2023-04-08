import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateAdminDto {
  @IsNumber()
  user_id: number;
  @IsBoolean()
  can_add_admins: boolean;
  @IsBoolean()
  is_system: boolean;
  @IsNumber()
  @IsOptional()
  parent?: number;
}
