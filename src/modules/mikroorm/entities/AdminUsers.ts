import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './User';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class AdminUsers extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => User })
  user!: User;

  @Property()
  can_add_admins!: boolean;

  @Property()
  is_system!: boolean;

  @Property({ columnType: 'int8', nullable: true })
  parent?: string;
}
