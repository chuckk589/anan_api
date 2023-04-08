import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class SystemSettings extends CustomBaseEntity {
  [OptionalProps]?: 'activationLimit' | 'autoAccept' | 'receiptMax' | 'receiptMin';

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text' })
  referral_system!: string;

  @Property({ columnType: 'text' })
  referral_system_year!: string;

  @Property({ columnType: 'text', nullable: true })
  referral_system_lev?: string;

  @Property({ columnType: 'float8', defaultRaw: `100` })
  activation_limit!: string;

  @Property({ default: false })
  auto_accept: boolean;

  @Property({ columnType: 'float8', defaultRaw: `0` })
  receipt_min!: string;

  @Property({ columnType: 'float8', defaultRaw: `0` })
  receipt_max!: string;
}
