import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Level extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'float8' })
  activation_amount!: number;
}
