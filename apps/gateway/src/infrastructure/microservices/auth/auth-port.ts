import {
  ConfirmPhoneRequestBody,
  ConfirmPhoneResponseBody,
  SignUpRequestBody,
  ValidateTokenRequestBody, ValidateTokenResponseBody,
} from '@libs/communication/auth/api'


export interface AuthServicePort {
  signIn(payload: SignUpRequestBody): Promise<void>
  confirm(payload: ConfirmPhoneRequestBody): Promise<ConfirmPhoneResponseBody>
  validate(payload: ValidateTokenRequestBody): Promise<ValidateTokenResponseBody>
}
