import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'


interface ValidatePayload {
  accessToken: string
}

interface JwtPayload {
  sub: string
}

export class ValidateUseCase {

  constructor(private readonly jwtService: JwtService) {}

  public async execute(payload: ValidatePayload): Promise<JwtPayload> {
    let tokenPayload: JwtPayload

    if (!payload.accessToken) {
      throw new UnauthorizedException()
    }

    try {
      tokenPayload = await this.jwtService.verifyAsync(
        payload.accessToken
      )
    } catch {
      throw new UnauthorizedException()
    }

    return tokenPayload
  }

}
