import { plainToClass } from 'class-transformer'
import { validateSync, ValidationError } from 'class-validator'
import { ClassConstructor } from 'class-transformer/types/interfaces'


export class ConfigValidator<TStructureClass extends object> {

  private readonly config: Record<string, unknown>
  private readonly configStructureClass: ClassConstructor<TStructureClass>

  constructor(
    config: Record<string, unknown>,
    configStructureClass: ClassConstructor<TStructureClass>
  ) {
    this.config = config
    this.configStructureClass = configStructureClass
  }

  getValidConfig(): TStructureClass {
    const validConfig: TStructureClass = this.getClassObjectConfig()
    this.checkConfigForErrors(validConfig)

    return validConfig
  }

  private checkConfigForErrors(config: TStructureClass): void {
    const errors: ValidationError[] = validateSync(
      config,
      { skipMissingProperties: false }
    )

    ConfigValidator.throwIfErrors(errors)
  }

  private static throwIfErrors(errors: ValidationError[]): void {
    const hasErrorsConfig: boolean = errors.length > 0

    if (hasErrorsConfig) {
      const errorText: string = errors.toString()
      throw new Error(errorText)
    }
  }

  private getClassObjectConfig(): TStructureClass {
    return plainToClass(
      this.configStructureClass,
      this.config,
      {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      }
    )
  }

}
