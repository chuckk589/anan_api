import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  async validateUser(password: string, username: string): Promise<{ username: string }> {
    return password == this.configService.get('PASSWORD') && username == this.configService.get('LOGIN') && { username: 'admin' };
  }

  async login(user: { username: string }) {
    return {
      access_token: this.jwtService.sign(user, { expiresIn: '1d' }),
    };
  }
}
