import { AdminUsers } from 'src/modules/mikroorm/entities/AdminUsers';
import { RetrieveUserDto } from 'src/modules/users/dto/retrieve-user.dto';

export class RetrieveAdminDto extends RetrieveUserDto {
  constructor(admin: AdminUsers) {
    super(admin.user);
    this.can_add_admins = admin.can_add_admins;
    this.is_system = admin.is_system;
    this.parent = admin.parent;
  }
  can_add_admins: boolean;
  is_system: boolean;
  parent: string;
}
