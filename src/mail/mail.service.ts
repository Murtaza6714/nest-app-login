import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendSignupMail(user: any) {
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Signup Successfull',
      template: './signup-success', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
      },
    });
  }

  async sendFacebookSignupMail(user: any) {
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Signup Successfull',
      template: './signup-success-facebook', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
