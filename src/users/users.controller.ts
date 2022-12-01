import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create() {
    return this.usersService.create();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }

  @Post('/login')
  async login(@Body() loginDto: loginDto) {
    return this.usersService.login(loginDto);
  }

  @Get('/home')
  async home(@Req() req: any) {
    return this.usersService.home(req);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return 200;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: any): Promise<any> {
    return this.usersService.facebookLoginRedirect(req.user);
  }

  @Get('/logout')
  async logout(@Req() req: any) {
    return this.usersService.logout(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
