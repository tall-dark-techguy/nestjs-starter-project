import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'src/globalconfig';
import { UserSchema } from '../profile/user.model';
import { UserAuthController } from './auth.controller';
import { UserAuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({ secret: config.user_jwt_secret }),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtStrategy],
})
export class UserAuthModule {}
