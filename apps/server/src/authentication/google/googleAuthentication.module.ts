import { Module } from '@nestjs/common';

import { AuthenticationModule } from '../authentication.module';

import { GoogleAuthenticationController } from './googleAuthentication.controller';
import { GoogleAuthenticationService } from './googleAuthentication.service';

import { UsersModule } from '@/users';

@Module({
  imports: [UsersModule, AuthenticationModule],
  providers: [GoogleAuthenticationService],
  controllers: [GoogleAuthenticationController],
})
export class GoogleAuthenticationModule {}
