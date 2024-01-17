import { validateSync, ValidationError } from 'class-validator'


export default class ClassValidator {

  public static validate(target: object): boolean {
    const errors: ValidationError[] = validateSync(target)

    const hasErrorsConfig: boolean = errors.length > 0

    return !hasErrorsConfig
  }

}
