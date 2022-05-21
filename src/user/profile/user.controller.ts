import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from 'src/utils/decorators/get-current-user.decorator';
import { UserAuthGuard } from 'src/utils/guards/user-jwt.guard';
import { UserService } from './user.service';

@UseGuards(UserAuthGuard)
@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('data')
  async getUserData(@GetCurrentUser() user: { sub: string }) {
    const data = await this.userService.fetchUserData(user.sub);

    return {
      status: 'success',
      data,
    };
  }
}
