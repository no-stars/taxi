import { Module } from '@nestjs/common'
import SmsModule from '@infrastructure/external-systems/sms/sms.module'



@Module({
  imports: [
    SmsModule,
  ],
  exports: [
    SmsModule,
  ],
})
export default class ExternalSystemsModule {}
