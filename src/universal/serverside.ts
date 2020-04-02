import { Logger } from "./logger";

/**
 * 요청 응답
 * @param response 응답
 * @param resultCode 결과 코드
 * @param message 메세지
 * @param data 응답 데이터
 */
async function response(
  response: any,
  statusCode: Number,
  message: String,
  data: any,
  resultCode?: Number | null
) {
  try {
    response.header("Access-Control-Allow-headers", "content-type");
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Methods",
      "GET, HEAD, PUT PATCH, POST DELETE"
    );

    return await response.status(statusCode).json({
      resultCode: resultCode,
      statusCode: statusCode,
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

    return await response.status(500).json({
      statusCode: statusCode,
      message: `server error: ${error.message}`
    });
  }
}

export { response };
