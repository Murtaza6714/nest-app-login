import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './users/middlewares/logging.middleware';
import { UsersModule } from './users/users.module';
// import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-app'),
    UsersModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('users/home');
    consumer.apply(LoggingMiddleware).forRoutes('users/logout');
  }
}
