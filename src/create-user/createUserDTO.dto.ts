import { MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @MaxLength(20)
  @MinLength(5)
  email: string;

  @MaxLength(30)
  @MinLength(3)
  username: string;
}
