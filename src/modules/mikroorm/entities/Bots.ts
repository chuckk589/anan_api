import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Bots extends CustomBaseEntity {
  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @Property({ length: 100 })
  username!: string;

  @Property({ length: 255 })
  token!: string;

  @Property({ columnType: 'int8' })
  user_id!: string;

  @Property()
  is_system!: boolean;

  @Property({ columnType: 'int2' })
  status!: number;

  @Property({ length: 40, nullable: true })
  last_online_at?: string;
}
