import { Body, Controller, Post } from '@nestjs/common';
import { UserAuthService } from './auth.service';
import { SignInLocalDTO } from './dto/signin-local.dto';
import { SignUpLocalDTO } from './dto/signup-local.dto';

@Controller('user/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('local/signup')
  async signUpLocal(@Body() body: SignUpLocalDTO) {
    const user = await this.userAuthService.signUpLocal(body);

    return {
      status: 'success',
      data: user,
      message: 'Account created successfully!',
    };
  }

  @Post('local/signin')
  async signInLocal(@Body() body: SignInLocalDTO) {
    const token = await this.userAuthService.signInLocal(body);

    return {
      status: 'success',
      data: token,
      message: 'Logged in successful!',
    };
  }
}
