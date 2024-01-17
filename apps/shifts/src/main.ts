import { ServerApplication } from '@application/server-application'
import 'reflect-metadata'


async function bootstrap() {
  const serverApplication: ServerApplication = ServerApplication.new()
  await serverApplication.run()
}

bootstrap()
