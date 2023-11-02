import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { RootModule } from '@application/modules/root.module'
import { options as proxyServiceOptions, PROTO_PATH } from '@libs/communication'

interface SwaggerOptions {
  title: string
  description: string
  version: string
}

export class ServerApplication {

  private readonly port: string = process.env.APP_PORT || '8888'
  private readonly appBasePath: string = process.env.APP_BASE_PATH || ''
  private readonly swaggerBasePath: string = process.env.SWAGGER_BASE_PATH || ''

  async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(RootModule)
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      })
    )
    app.setGlobalPrefix(this.appBasePath)

    console.log(PROTO_PATH)

    this.buildAPIDocumentation(app)
    this.log()

    await app.listen(this.port)
  }

  static new(): ServerApplication {
    return new ServerApplication()
  }

  private buildAPIDocumentation(app: NestExpressApplication): void {
    const SWAGGER_OPTIONS: SwaggerOptions = {
      title: 'ResearchCenter',
      description: 'Center for public opinion research',
      version: '1.0',
    }

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(SWAGGER_OPTIONS.title)
      .setDescription(SWAGGER_OPTIONS.description)
      .setVersion(SWAGGER_OPTIONS.version)
      .setBasePath(this.appBasePath)
      .build()

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(this.swaggerBasePath, app, document)
  }

  private log(): void {
    console.log(`Server is running on port: ${this.port}`)
  }

}
