
export default class ArrayUtils {

  static range(length: number): number[] {
    return [...Array(length).keys()]
  }

}
