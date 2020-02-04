/**
 * HTTP통신 요청을 위한 주변 환경값들을 저장하는 클래스
 */
class RequestConfig {
  endpoint: String;
  method: Method;
  body?: Object;

  constructor(endpoint: String, method: Method) {
    this.endpoint = endpoint;
    this.method = method;
  }
}

/**
 * @summary HTTP통신의 METHOD
 */
enum Method {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete"
}

export { RequestConfig, Method };
