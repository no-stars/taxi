import { Module } from '@nestjs/common'
import { HttpModule, HttpService } from '@nestjs/axios'
import { AuthServiceHttpAdapter } from '@infrastructure/microservices/auth/auth-http.service'
import { AUTH_SERVICE_TOKEN } from '@core/common/tokens'


@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: AUTH_SERVICE_TOKEN,
      useFactory: (httpService: HttpService) => {
        return new AuthServiceHttpAdapter(httpService)
      },
      inject: [HttpService],
    },
  ],
  exports: [
    AUTH_SERVICE_TOKEN,
  ],
})
export default class AuthModule {}
