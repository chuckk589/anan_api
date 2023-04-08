import { Injectable } from '@nestjs/common';
import { UpdateSystemDto } from './dto/update-system.dto';
import { UpdateRateDto } from '../users/dto/update-rate.dto';
import { UpdateLevelRateDto } from '../users/dto/update-level-rate.dto';
import { EntityManager } from '@mikro-orm/core';
import { SystemSettings } from '../mikroorm/entities/SystemSettings';
import { RetrieveSystemDto } from './dto/retrieve-system.dto';

@Injectable()
export class SystemsService {
  constructor(private readonly em: EntityManager) {}
  async getAll(): Promise<RetrieveSystemDto[]> {
    const systemSettings = await this.em.find(SystemSettings, {});
    return systemSettings.map((system) => new RetrieveSystemDto(system));
  }
  async get(): Promise<RetrieveSystemDto> {
    const systemSetting = await this.em.findOne(SystemSettings, { id: 1 });
    if (!systemSetting) throw new Error('Settings not found');
    return new RetrieveSystemDto(systemSetting);
  }
  async getOne(id: number): Promise<RetrieveSystemDto> {
    const systemSetting = await this.em.findOne(SystemSettings, { id });
    if (!systemSetting) throw new Error('Settings not found');
    return new RetrieveSystemDto(systemSetting);
  }
  async update(body: UpdateSystemDto): Promise<void> {
    const systemSetting = await this.em.findOne(SystemSettings, { id: 1 });
    if (!systemSetting) throw new Error('Settings not found');
    systemSetting.activation_limit = body.activation_limit.toString();
    systemSetting.auto_accept = body.auto_accept;
    return await this.em.persistAndFlush(systemSetting);
  }
  async updateRate(id: number, body: UpdateRateDto): Promise<void> {
    const systemSetting = await this.em.findOne(SystemSettings, { id });
    if (!systemSetting) throw new Error('Settings not found');
    systemSetting.referral_system = JSON.stringify(body.rate);
    return await this.em.persistAndFlush(systemSetting);
  }
  async updateLevelRate(id: number, body: UpdateLevelRateDto): Promise<void> {
    const systemSetting = await this.em.findOne(SystemSettings, { id });
    if (!systemSetting) throw new Error('Settings not found');
    systemSetting.referral_system_lev = JSON.stringify(body.rate);
    return await this.em.persistAndFlush(systemSetting);
  }
}
