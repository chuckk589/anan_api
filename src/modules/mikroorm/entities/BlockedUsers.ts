import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './User';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class BlockedUsers extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => User })
  user!: User;

  @Property({ length: 30 })
  reason!: string;

  @Property({ length: 40, nullable: true })
  unblock_date?: string;
}
