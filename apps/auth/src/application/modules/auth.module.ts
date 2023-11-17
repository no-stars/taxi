import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import ExternalSystemsModule from '@infrastructure/external-systems/external-systems.module'
import { AuthController } from '@application/controllers/auth.controller'
import { SignInUseCase } from '@core/service/usecase/sign-in.usecase'
import { SmsSystemFakeAdapter } from '@infrastructure/external-systems/sms/sms-fake.service'
import { InMemoryConfirmCodeRepositoryAdapter } from '@infrastructure/persistent/redis/repository/confirm-code-repository.adapter'
import { ConfirmUseCase } from '@core/service/usecase/confirm.usecase'
import { PgAccountRepositoryAdapter } from '@infrastructure/persistent/pg/repository/account-repository.adapter'
import { SecurityVariables } from '@infrastructure/config/security/security.interface'
import { ValidateUseCase } from '@core/service/usecase/validate.usecase'


const useCaseProviders = [
  {
    provide: SignInUseCase,
    useFactory: (smsSystem: SmsSystemFakeAdapter, confirmCodeRepository: InMemoryConfirmCodeRepositoryAdapter) => {
      return new SignInUseCase(smsSystem, confirmCodeRepository)
    },
    inject: [SmsSystemFakeAdapter, InMemoryConfirmCodeRepositoryAdapter],
  },
  {
    provide: ConfirmUseCase,
    useFactory: (
      accountRepository: PgAccountRepositoryAdapter,
      confirmCodeRepository: InMemoryConfirmCodeRepositoryAdapter,
      jwtService: JwtService
    ) => {
      return new ConfirmUseCase(accountRepository, confirmCodeRepository, jwtService)
    },
    inject: [PgAccountRepositoryAdapter, InMemoryConfirmCodeRepositoryAdapter, JwtService],
  },
  {
    provide: ValidateUseCase,
    useFactory: (jwtService: JwtService) => {
      return new ValidateUseCase(jwtService)
    },
    inject: [JwtService],
  },
]


@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<SecurityVariables>) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    ExternalSystemsModule,
    HttpModule,
  ],
  providers: [
    ...useCaseProviders,
    SmsSystemFakeAdapter,
    PgAccountRepositoryAdapter,
    InMemoryConfirmCodeRepositoryAdapter,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
