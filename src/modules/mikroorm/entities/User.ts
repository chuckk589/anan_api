import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Level } from './Level';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class User extends CustomBaseEntity {
  @PrimaryKey({ columnType: 'int8' })
  user_id!: number;

  @Property({ length: 50 })
  username!: string;

  @Property()
  status!: boolean;

  @ManyToOne({ entity: () => User, nullable: true })
  referrer_id?: User;

  @Property({ columnType: 'float8' })
  balance!: number;

  @Property({ columnType: 'float8' })
  earned!: number;

  @ManyToOne({ entity: () => Level, nullable: true })
  level?: Level;

  @Property({ length: 40, nullable: true })
  last_annual_payment?: string;

  @Property({ columnType: 'float8', nullable: true })
  invest_balance?: number;

  @Property({ length: 50, nullable: true })
  first_name?: string;

  @Property({ nullable: true, default: 0 })
  count_annual_payment?: number = 0;

  @Property({ nullable: true, default: false })
  is_blocked?: boolean = false;

  @Property({ columnType: 'text', nullable: true })
  referral_system?: string;

  @Property({ columnType: 'text', nullable: true })
  referral_system_year?: string;

  @Property({ columnType: 'text', nullable: true })
  referral_system_lev?: string;

  @Property({ columnType: 'float8', nullable: true })
  activation_limit?: number;

  @Property({ nullable: true, defaultRaw: `ARRAY[]::bigint[]` })
  interested?: string[];

  @Property({ columnType: 'int8', nullable: true })
  bot_id?: number;

  @Property({ length: 5, nullable: true, default: 'ru' })
  language?: string;

  @Property({ nullable: true, default: true })
  is_subscribed?: boolean = true;
}
