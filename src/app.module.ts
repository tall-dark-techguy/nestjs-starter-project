import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './globalconfig';
import { UserAuthModule } from './user/auth/auth.module';
import { UserModule } from './user/profile/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongodb_uri),

    // user
    UserAuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
