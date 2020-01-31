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

/**
 * @summary 요청 응답
 * @param response 응답
 * @param resultCode 결과 코드
 * @param message 메세지
 * @param data 응답 데이터
 */
async function response(
  response: any,
  resultCode: number,
  message: String,
  data: any
) {
  try {
    response.header("Access-Control-Allow-headers", "content-type");
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Methods",
      "GET, HEAD, PUT PATCH, POST DELETE"
    );
    return await response.status(resultCode).json({
      code: resultCode,
      message: message,
      Data: data
    });
  } catch (error) {
    response.header("Access-Control-Allow-headers", "content-type");
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Methods",
      "GET, HEAD, PUT PATCH, POST DELETE"
    );

    Logger.showError(error.message);
    return await response.status(500).json({
      resultCode: 500,
      message: `server error: ${error.message}`
    });
  }
}

export { repeat, response };
