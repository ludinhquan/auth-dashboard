import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions, JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  private readonly jwtService: NestJwtService;

  constructor(private configService: ConfigService) {
    this.jwtService = new NestJwtService({
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      signOptions: {
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    });
  }

  sign<T extends object>(
    payload: T,
    options?: Omit<JwtSignOptions, keyof JwtSignOptions>,
  ) {
    return this.jwtService.sign(payload, options);
  }

  verify<T extends object>(token: string, options?: JwtSignOptions): T {
    return this.jwtService.verify(token, options);
  }
}
