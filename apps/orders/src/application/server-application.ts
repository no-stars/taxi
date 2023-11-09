import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { LoggerService, ValidationPipe, ValidationPipeOptions } from "@nestjs/common"
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { RootModule } from '@application/modules/root.module'
import { Logger as PinoLogger } from 'nestjs-pino'


interface SwaggerOptions {
  title: string
  description: string
  version: string
}

export class ServerApplication {

  private readonly port: string = process.env.APP_PORT || '3000'
  private readonly appBasePath: string = process.env.APP_BASE_PATH || ''
  private readonly swaggerBasePath: string = process.env.SWAGGER_BASE_PATH || ''

  private logger: LoggerService

  async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(
      RootModule,
      { bufferLogs: true }
    )

    const validationOptions: ValidationPipeOptions = {
      whitelist: true,
      transform: true,
    }

    this.logger = app.get(PinoLogger)

    app.useGlobalPipes(new ValidationPipe(validationOptions))
    app.setGlobalPrefix(this.appBasePath)
    app.useLogger(this.logger)

    this.buildAPIDocumentation(app)
    this.log()

    await app.listen(this.port)
  }

  static new(): ServerApplication {
    return new ServerApplication()
  }

  private buildAPIDocumentation(app: NestExpressApplication): void {
    const SWAGGER_OPTIONS: SwaggerOptions = {
      title: 'Taxi',
      description: 'Taxi application backend',
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
    this.logger.log(`Server is running on port: ${this.port}`)
    this.logger.log(`Environment: ${process.env.NODE_ENV}`)
  }

}
