import { IsBoolean, IsNumber } from 'class-validator';
import { SystemSettings } from 'src/modules/mikroorm/entities/SystemSettings';
import { RateObj, LevelRateObj } from 'src/modules/users/dto/retrieve-user.dto';

export class RetrieveSystemDto {
  constructor(system: SystemSettings) {
    this.id = system.id;
    this.referral_system = JSON.parse(system.referral_system);
    this.referral_system_year = system.referral_system_year;
    this.referral_system_lev = JSON.parse(system.referral_system_lev);
    this.activation_limit = parseInt(system.activation_limit);
    this.auto_accept = system.auto_accept;
    this.receipt_min = parseInt(system.receipt_min);
    this.receipt_max = parseInt(system.receipt_max);
  }
  id: number;

  referral_system: RateObj;

  referral_system_year: string;

  referral_system_lev: LevelRateObj[];

  @IsNumber()
  activation_limit: number;

  @IsBoolean()
  auto_accept: boolean;

  receipt_min!: number;

  receipt_max!: number;
}
