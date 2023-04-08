import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Text extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ length: 50 })
  depends!: string;

  @Property({ columnType: 'text' })
  text!: string;
}
