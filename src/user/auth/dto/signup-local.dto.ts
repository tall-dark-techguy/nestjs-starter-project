import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpLocalDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
