import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber, IsArray } from 'class-validator';
import { User } from 'src/modules/mikroorm/entities/User';

export class RateObj {
  @IsNumber()
  lev1: number;
  @IsNumber()
  lev2: number;
  @IsNumber()
  lev3: number;
  @IsNumber()
  lev4: number;
  @IsNumber()
  lev5: number;
  @IsNumber()
  lev6: number;
}
export class LevelRateObj {
  @ApiProperty({ type: 'number', isArray: true, example: [0, 0] })
  @IsNumber({}, { each: true })
  lev1: [number, number];
  @IsNumber()
  lev2: number;
  @IsNumber()
  lev3: number;
  @IsNumber()
  lev4: number;
  @IsNumber()
  lev5: number;
  @IsNumber()
  lev6: number;
}

export class RetrieveUserDto {
  constructor(user: User) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.status = user.status;
    this.referrer = user.referrer_id ? new RetrieveUserDto(user.referrer_id) : null;
    this.balance = user.balance;
    this.earned = user.earned;
    this.activation_amount = user.level ? user.level.activation_amount : null;
    this.last_annual_payment = user.last_annual_payment;
    this.invest_balance = user.invest_balance;
    this.first_name = user.first_name;
    this.count_annual_payment = user.count_annual_payment;
    this.is_blocked = user.is_blocked;
    this.referral_system = JSON.parse(user.referral_system);
    this.referral_system_year = user.referral_system_year;
    this.referral_system_lev = JSON.parse(user.referral_system);
    this.activation_limit = user.activation_limit;
    this.interested = user.interested;
    this.bot_id = user.bot_id;
    this.language = user.language;
    this.is_subscribed = user.is_subscribed;
  }

  user_id: number;

  username: string;

  status: boolean;

  @ApiProperty({ type: OmitType(RetrieveUserDto, ['referrer']) })
  referrer: RetrieveUserDto;

  balance: number;

  earned: number;

  activation_amount: number;

  last_annual_payment: string;

  invest_balance: number;

  first_name: string;

  count_annual_payment: number;

  is_blocked: boolean;

  referral_system: RateObj;

  referral_system_year: string;

  referral_system_lev: LevelRateObj[];

  activation_limit: number;

  interested: string[];

  bot_id: number;

  language: string;

  is_subscribed: boolean;
}
