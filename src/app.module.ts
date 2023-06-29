import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { HttpModule } from '@nestjs/axios'
import { User } from './users/entities/user.entity'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

@Module({
	imports: [
		AuthModule,
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
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	]
})
export class AppModule {}
