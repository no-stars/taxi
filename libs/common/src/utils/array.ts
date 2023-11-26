import { faker } from '@faker-js/faker'


export default class ArrayUtils {

  static range(length: number): number[] {
    return [...Array(length).keys()]
  }

  static randomChoice<T>(arr: T[]): T {
    return faker.helpers.arrayElement(arr)
  }

}
