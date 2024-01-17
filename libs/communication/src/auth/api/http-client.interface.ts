import { SignUpRequestBody } from './request/sign-up-request-body'
import { ConfirmPhoneRequestBody } from './request/confirm-phone-request-body'
import { ConfirmPhoneResponseBody } from './response/confirm-phone-response-body'
import { ValidateTokenRequestBody } from './request/validate-token-request-body'
import { ValidateTokenResponseBody } from './response/validate-token-response-body'

export interface AuthService {
  signIn(payload: SignUpRequestBody): Promise<void>
  confirm(payload: ConfirmPhoneRequestBody): Promise<ConfirmPhoneResponseBody>
  validate(payload: ValidateTokenRequestBody): Promise<ValidateTokenResponseBody>
}
