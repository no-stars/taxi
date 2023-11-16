import { randomUUID } from 'crypto'


export default class StringUtils {

  static uuid(): string {
    return randomUUID()
  }

}
