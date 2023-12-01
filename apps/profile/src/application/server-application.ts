import { NestApplication, NestFactory } from '@nestjs/core'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { INestApplication, LoggerService, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'
import { Logger as PinoLogger } from 'nestjs-pino'

import { RootModule } from '@application/modules/root.module'
import { SwaggerOptions } from '@libs/common/interfaces'


export class ServerApplication {

  private logger: LoggerService
  private readonly port: string = process.env.APP_PORT || '3004'
  private readonly swaggerBasePath: string = process.env.SWAGGER_BASE_PATH || ''

  async run(): Promise<void> {
    const app: NestApplication = await NestFactory.create(RootModule, { bufferLogs: true })

    this.logger = app.get(PinoLogger)

    const validationOptions: ValidationPipeOptions = {
      whitelist: true,
      transform: true,
    }

    app.useLogger(this.logger)
    app.useGlobalPipes(new ValidationPipe(validationOptions))

    this.log()
    this.buildAPIDocumentation(app)

    await app.listen(this.port)
  }

  static new(): ServerApplication {
    return new ServerApplication()
  }

  private buildAPIDocumentation(app: INestApplication): void {
    const SWAGGER_OPTIONS: SwaggerOptions = {
      title: 'Taxi Profile Service',
      description: 'Taxi profile service',
      version: '1.0',
    }

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(SWAGGER_OPTIONS.title)
      .setDescription(SWAGGER_OPTIONS.description)
      .setVersion(SWAGGER_OPTIONS.version)
      .build()

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(this.swaggerBasePath, app, document)
  }

  private log(): void {
    this.logger.log(`App is running on port: ${this.port}`)
  }

}
