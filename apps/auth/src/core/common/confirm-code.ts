import { NumberUtils } from '@libs/common/utils'

export class ConfirmCode {

  constructor(private readonly code: string) {}

  public static new(dig: number): ConfirmCode {
    const code: string = ConfirmCode.generate(dig)
    return new ConfirmCode(code)
  }

  public isEqual(code: ConfirmCode): boolean {
    return this.valueOf() === code.valueOf()
  }

  private static generate(dig: number): string {
    const maxRange: number = 10 ** dig - 1

    return NumberUtils.randomInt(0, maxRange).toString().padStart(dig, '0')
  }

  toString(): string {
    return this.code
  }

  valueOf(): string {
    return this.code
  }

}

