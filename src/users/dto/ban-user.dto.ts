import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BanUserDto {
  @ApiProperty({example: '1', description: 'User id'})
  @IsNumber({}, {message: 'Should be number'})
  readonly userId: number;
  @ApiProperty({example: 'Banned for bad behaviour', description: 'Describes specific reason for ban'})
  @IsString({message: 'Should be string'})
  readonly banReason: string;
}
