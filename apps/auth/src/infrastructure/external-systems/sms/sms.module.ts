import { Module } from '@nestjs/common'
import { HttpModule, HttpService } from '@nestjs/axios'
import { SmsSystemFakeAdapter } from '@infrastructure/external-systems/sms/sms-fake.service'
import { SMS_SYSTEM_TOKEN } from '@core/common/tokens'


@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: SMS_SYSTEM_TOKEN,
      useFactory: (httpService: HttpService) => {
        return new SmsSystemFakeAdapter(httpService)
      },
      inject: [HttpService],
    },
  ],
  exports: [
    SMS_SYSTEM_TOKEN,
  ],
})
export default class SmsModule {}
