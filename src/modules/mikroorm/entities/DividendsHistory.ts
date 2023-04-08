import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class DividendsHistory extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'int8' })
  recipient!: string;

  @Property({ columnType: 'int8' })
  sender!: string;

  @Property({ columnType: 'float8' })
  amount!: string;

  @Property({ columnType: 'int2' })
  gen!: number;

  @Property()
  is_annual!: boolean;
}
