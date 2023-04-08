import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Receipt extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'int8' })
  owner_id!: string;

  @Property({ columnType: 'int8', nullable: true })
  user_id?: string;

  @Property()
  cost!: number;

  @Property()
  transaction_id!: number;

  @Property({ length: 32 })
  qr_code!: string;

  @Property({ columnType: 'int2' })
  status!: number;

  @Property({ length: 40, nullable: true })
  activated_at?: string;
}
