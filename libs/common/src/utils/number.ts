

export default class NumberUtils {

  static randomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min) + min)
  }

}
