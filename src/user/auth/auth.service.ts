import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../profile/user.model';
import { SignUpLocalDTO } from './dto/signup-local.dto';
import * as bcryptjs from 'bcrypt';
import { SignInLocalDTO } from './dto/signin-local.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  // sign-up user
  async signUpLocal(body: SignUpLocalDTO): Promise<User> {
    const { email, password } = body;
    let user = await this.userModel.findOne({ email });

    if (user) {
      throw new BadRequestException('That email is taken! Try another.');
    }

    user = new this.userModel({
      email,
    });

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    return await user.save();
  }

  // login user
  async signInLocal(body: SignInLocalDTO) {
    const { email, password } = body;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid login credentials.');
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid login credentials.');
    }

    return this.signUser(user.id, user.email, 'user');
  }

  // generate signed jwt
  signUser(id: string, email: string, type: string) {
    return this.jwtService.sign({
      sub: id,
      email,
      type,
    });
  }
}
