import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateLevelRateDto } from './dto/update-level-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../mikroorm/entities/User';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { Level } from '../mikroorm/entities/Level';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}
  async getAll(): Promise<RetrieveUserDto[]> {
    const users = await this.em.find(User, {}, { populate: ['referrer_id', 'level'] });
    return users.map((user) => new RetrieveUserDto(user));
  }
  async get(id: number): Promise<RetrieveUserDto> {
    const user = await this.em.findOne(User, { user_id: id }, { populate: ['referrer_id', 'level'] });
    if (!user) throw new NotFoundException('User not found');
    return new RetrieveUserDto(user);
  }
  async update(id: number, body: UpdateUserDto) {
    const user = await this.em.findOne(User, { user_id: id }, { populate: ['referrer_id', 'level'] });
    if (!user) throw new NotFoundException('User not found');
    if (body.referrer_id) {
      const referer = await this.em.findOne(User, { user_id: body.referrer_id });
      if (!referer) throw new NotFoundException('Referer not found');
      user.referrer_id = referer;
    }
    if (body.level_id) {
      const level = await this.em.findOne(Level, { id: body.level_id });
      if (!level) throw new NotFoundException('Level not found');
      user.level = level;
    }
    const { referrer_id, level_id, ...rest } = body;
    this.em.assign(user, rest);
    return await this.em.persistAndFlush(user);
  }
  async updateRate(id: number, body: UpdateRateDto) {
    const user = await this.em.findOne(User, { user_id: id });
    if (!user) throw new NotFoundException('User not found');
    user.referral_system = JSON.stringify(body.rate);
    return await this.em.persistAndFlush(user);
  }
  async updateLevelRate(id: number, body: UpdateLevelRateDto) {
    const user = await this.em.findOne(User, { user_id: id });
    if (!user) throw new NotFoundException('User not found');
    user.referral_system_lev = JSON.stringify(body.rate);
    return await this.em.persistAndFlush(user);
  }
}
