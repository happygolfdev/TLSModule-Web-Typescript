import { Logger } from "./logger";

/**
 * @param array 반복을 돌리고 싶은 배열
 * @param callback 각 반복하는 값과 index값을 리턴하는 함수
 */
async function repeat(
  array: any[],
  callback: (value: any, idx: Number) => void
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

export { repeat };
