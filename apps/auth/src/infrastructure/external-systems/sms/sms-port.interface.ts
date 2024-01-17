export default interface SmsSystemPort {
  sendSMS(phoneNumber: string, message: string): Promise<any>
}
