import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.usersService.create(createUserDto)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto
	): Promise<void> {
		return await this.usersService.update(+id, updateUserDto)
	}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<User> {
		return await this.usersService.findOne(id)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: number): Promise<void> {
		return await this.usersService.remove(id)
	}
}
