import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @ApiProperty({example: 'test@gmail.com', description: 'User email'})
  @IsString({message: 'Should be string'})
  @IsEmail({}, {message: 'Email is not correct'})
  readonly email: string;
  @ApiProperty({example: '12345678', description: 'User password'})
  @IsString({message: 'Should be string'})
  @Length(4, 16, {message: 'Should be more than 4 and less than 16 characters'}) 
  readonly password: string;
}
 