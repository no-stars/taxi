import { Module } from '@nestjs/common'
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino'
import { pinoConfig } from '@infrastructure/logger/logger.config'


// noinspection TypeScriptValidateJSTypes
@Module({
  imports: [
    PinoLoggerModule.forRoot(pinoConfig),
  ],
})
export default class LoggerModule {}
