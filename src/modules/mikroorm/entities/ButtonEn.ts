import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class ButtonEn extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  original_id!: number;

  @Property({ columnType: 'text' })
  text!: string;
}
