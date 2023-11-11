import { Transport } from '@nestjs/microservices'
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface'
import { KafkaOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface'


const options: NestMicroserviceOptions & KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
  },
}

export default options
