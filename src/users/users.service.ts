import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { loginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { passwordGenerator } from '../../config/constants';
import axios from 'axios';
import { MailService } from 'src/mail/mail.service';
// import nodemailer from 'nodemailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailService: MailService,
  ) {}
  create() {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async signup(signupDto: SignupDto) {
    signupDto.password = await bcrypt.hash(signupDto.password, 12);
    const userCreated = new this.userModel(signupDto);
    await userCreated.save();
    await this.mailService.sendSignupMail(userCreated);
    return userCreated;
  }

  async login(loginDto: loginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) throw new Error('User not found');
    const check = await bcrypt.compare(loginDto.password, user.password);
    if (!check) throw new Error('Password is incorrect!!');
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
    );
    return { user, token };
  }
  async home(req: any) {
    let data: any;
    const user = await this.userModel.findById(req.user._id);
    if (!user) throw new Error('User not found');
    if (user.accessToken) {
      data = await axios.get(
        `https://graph.facebook.com/me?access_token=${user.accessToken}`,
      );
    }
    return { user: req.user, facebookData: data?.data || {} };
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async facebookLoginRedirect(userData: any) {
    const user: any = await this.userModel.findOne({
      email: userData.user.email,
    });
    if (!user) {
      const newPassword = passwordGenerator();
      const password = await bcrypt.hash(newPassword, 12);
      const newUser = new this.userModel({
        name: userData.user.firstName,
        email: userData.user.email,
        password,
        accessToken: userData.accessToken,
      });
      await newUser.save();
      await this.mailService.sendFacebookSignupMail({
        name: newUser.name,
        email: newUser.email,
        password: newPassword,
      });
      return { user: newUser, message: 'User saved successfully' };
    }
    user.accessToken = userData.accessToken;
    user.save();
    return { user };
  }

  async logout(req: any) {
    const user = await this.userModel.findById(req.user._id);
    user.accessToken = '';
    await user.save();
    return 'Logged out Successfull!!';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
