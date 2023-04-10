import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { EntityManager } from '@mikro-orm/core';
import { AdminUsers } from '../mikroorm/entities/AdminUsers';
import { RetrieveAdminDto } from './dto/retrieve-admin.dto';
import { User } from '../mikroorm/entities/User';

@Injectable()
export class AdminsService {
  constructor(private readonly em: EntityManager) {}
  async getAll(): Promise<RetrieveAdminDto[]> {
    const admins = await this.em.find(AdminUsers, {}, { populate: ['user.level', 'user.referrer_id'] });
    return admins.map((admin) => new RetrieveAdminDto(admin));
  }
  async get(id: number): Promise<RetrieveAdminDto> {
    const admin = await this.em.findOne(AdminUsers, { user: { user_id: id } }, { populate: ['user.level', 'user.referrer_id'] });
    if (!admin) throw new NotFoundException('Admin not found');
    return new RetrieveAdminDto(admin);
  }
  async create(body: CreateAdminDto): Promise<void> {
    const user = await this.em.findOne(User, { user_id: body.user_id }, { populate: ['level'] });
    if (!user) throw new NotFoundException('User not found');
    const existingAdmin = await this.em.findOne(AdminUsers, { user });
    if (existingAdmin) throw new ConflictException('User is already an admin');
    const admin = this.em.create(AdminUsers, {
      user,
      can_add_admins: body.can_add_admins,
      is_system: body.is_system,
      ...(body.parent && { parent: body.parent.toString() }),
    });
    return await this.em.persistAndFlush(admin);
  }
  async update(id: number, body: UpdateAdminDto): Promise<void> {
    const admin = await this.em.findOne(AdminUsers, { user: { user_id: id } });
    if (!admin) throw new NotFoundException('Admin not found');
    admin.can_add_admins = body.can_add_admins;
    body.parent && (admin.parent = body.parent.toString());
    return await this.em.persistAndFlush(admin);
  }
  async remove(id: number): Promise<void> {
    const admin = await this.em.findOne(AdminUsers, { user: { user_id: id } });
    if (!admin) throw new NotFoundException('Admin not found');
    return await this.em.removeAndFlush(admin);
  }
}
