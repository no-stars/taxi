import { INestMicroservice } from '@nestjs/common'
import { MicroserviceOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { LoggerService, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'
import { RootModule } from '@application/modules/root.module'
import { Logger as PinoLogger } from 'nestjs-pino'
import { options as serviceOptions } from '@libs/communication/orders'
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface'
import { KafkaOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface'


export class ServerApplication {

  private logger: LoggerService

  async run(): Promise<void> {
    const options: NestMicroserviceOptions & KafkaOptions = {
      transport: serviceOptions.transport,
      options: {
        client: {
          brokers: serviceOptions.options?.client?.brokers || [],
        },
        consumer: {
          groupId: 'orders-consumer',
        },
      },
      bufferLogs: true,
    }

    const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(RootModule, options)

    this.logger = app.get(PinoLogger)

    const validationOptions: ValidationPipeOptions = {
      whitelist: true,
      transform: true,
    }

    app.useLogger(this.logger)
    app.useGlobalPipes(new ValidationPipe(validationOptions))

    await app.listen()

    this.log()
  }

  static new(): ServerApplication {
    return new ServerApplication()
  }

  private log(): void {
    this.logger.log(`Service is listening ${serviceOptions.options?.client?.brokers}`)
  }

}
