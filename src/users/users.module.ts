import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { FacebookStrategy } from './facebook-config/facebook.strategy';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, FacebookStrategy, MailService],
})
export class UsersModule {}
