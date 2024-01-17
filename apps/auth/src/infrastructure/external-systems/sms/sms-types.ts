export interface FakeResponseData {
  _quantity: number
  phone_number: string
  text: string
}

export interface FakeResponse {
  status: string
  code: number
  total: number
  data: FakeResponseData
}
