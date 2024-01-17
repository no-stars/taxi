import { Params } from 'nestjs-pino'

export const pinoConfig: Params = {
  pinoHttp: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss',
        singleLine: true,
      },
    },
  },
}
