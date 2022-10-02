import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '@/modules/user/user.module'
import { AuthModule } from './../auth/auth.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import {
	HttpExceptionFilter,
	MongoExceptionFilter,
	JoiExceptionFilter,
} from '@/common/filters'
import { envConfigValidate, envConfigLoad } from '@/config/env.config'
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			load: [envConfigLoad],
			validationSchema: envConfigValidate,
			cache: true,
		}),
		MongooseModule.forRoot(envConfigLoad().mongo.url),
		UserModule,
		AuthModule,
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 10,
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: MongoExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: JoiExceptionFilter,
		},
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
