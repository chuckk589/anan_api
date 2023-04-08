import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly em: EntityManager) {}

  async validateUser(pass: string): Promise<any> {
    return true;
    // const password = await this.em.findOne(Config, { name: 'ADMIN_PASSCODE' });
    // const valid = await compare(pass, password.value);
    // return valid && { username: 'admin' };
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user, { expiresIn: '1d' }),
    };
  }
}
