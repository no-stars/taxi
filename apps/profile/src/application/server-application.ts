import { INestMicroservice } from '@nestjs/common'
import { MicroserviceOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { LoggerService, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'
import { Logger as PinoLogger } from 'nestjs-pino'

import { RootModule } from '@application/modules/root.module'
import { options as serviceOptions } from '@libs/communication/profile'


export class ServerApplication {

  private readonly port: string = process.env.APP_PORT || '3004'
  private logger: LoggerService

  async run(): Promise<void> {
    const kafkaMicroservice: MicroserviceOptions = {
      transport: serviceOptions.transport,
      options: {
        client: {
          brokers: serviceOptions.options?.client?.brokers || [],
        },
        consumer: {
          groupId: 'profile-consumer',
        },
      },
    }

    const app = await NestFactory.create(RootModule, { bufferLogs: true })
    // const microservice: INestMicroservice = app.connectMicroservice<MicroserviceOptions>(
    //   kafkaMicroservice,
    //   { inheritAppConfig: true }
    // )

    this.logger = app.get(PinoLogger)

    const validationOptions: ValidationPipeOptions = {
      whitelist: true,
      transform: true,
    }

    app.useLogger(this.logger)
    app.useGlobalPipes(new ValidationPipe(validationOptions))

    // await app.startAllMicroservices()
    await app.listen(this.port)

    this.log()
  }

  static new(): ServerApplication {
    return new ServerApplication()
  }

  private log(): void {
    this.logger.log(`App is running on port: ${this.port}`)
    this.logger.log(`Service is listening ${serviceOptions.options?.client?.brokers}`)
  }

}
