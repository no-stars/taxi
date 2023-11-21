import { Transport } from '@nestjs/microservices'
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface'
import { KafkaOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface'


const BROKER_URI: string = process.env.KAFKA_BROKER_URI ?? ''

const options: NestMicroserviceOptions & KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [BROKER_URI],
    },
  },
}

export default options
