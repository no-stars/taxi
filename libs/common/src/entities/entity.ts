import { IsUUID } from 'class-validator'
import { ClassValidator } from '../utils'

export abstract class BaseEntity {

  @IsUUID()
  protected id: string

  public getId(): string {
    return this.id
  }

  public validate(): void {
    const isValid: boolean = ClassValidator.validate(this)

    if (!isValid) {
      throw new Error()
    }
  }

}
