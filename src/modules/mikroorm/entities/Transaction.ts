import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './User';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Transaction extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => User })
  user!: User;

  @Property({ length: 15 })
  type!: string;

  @Property({ columnType: 'float8' })
  amount!: string;

  @Property({ length: 20 })
  status!: string;

  @Property()
  paid!: boolean;

  @Property({ columnType: 'int8', nullable: true })
  channel_message_id?: string;

  @Property({ columnType: 'float8', nullable: true })
  balance?: string;
}
