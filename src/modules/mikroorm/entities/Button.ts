import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Button extends CustomBaseEntity {
  [OptionalProps]?: 'hide' | 'line' | 'url';

  @PrimaryKey()
  id!: number;

  @Property({ length: 100 })
  keyboard!: string;

  @Property({ length: 100 })
  text!: string;

  @Property({ length: 100 })
  data!: string;

  @Property({ default: false })
  hide: string;

  @Property({ default: 0 })
  line: string;

  @Property({ default: false })
  url: string;
}
