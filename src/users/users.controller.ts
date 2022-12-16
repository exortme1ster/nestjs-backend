import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status: 200, type: [User]})
  // @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({summary: 'Get specific user by email'})
  @ApiResponse({status: 200, type: User})
  @Get('/:email')
  getByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email)
  }

  @ApiOperation({summary: 'Give role to specific user'})
  @ApiResponse({status: 200})
  @UsePipes(ValidationPipe)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto)
  }

  @ApiOperation({summary: 'Ban specific user'})
  @ApiResponse({status: 200})
  @UsePipes(ValidationPipe)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto)
  }
}
