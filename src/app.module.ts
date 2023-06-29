import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { HttpModule } from '@nestjs/axios'
import { User } from './users/entities/user.entity'

@Module({
	imports: [
		UsersModule,
		HttpModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'db',
			entities: [User],
			synchronize: true
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
