import { User } from "./user";
import axios from "axios";
import { Logger } from "./logger";

/**
 * @class HTTP 서버통신의 요청작업을 수행하는 클래스
 */
class RequestManager {
  constructor() {}

  /**
   * @summary 요청한다.
   * @param baseRequest 요청에 필요한 기본적인 데이터 모델
   * @param user 클라이언트의 사용자 데이터 모델
   */
  async request(baseRequest: BaseRequest, user?: User) {
    try {
      const headers = {
        Authorization: `bearer ${user?.accessToken}`
      };

      const response = await axios({
        method: baseRequest.config.method,
        url: `${baseRequest.baseURL}${baseRequest.config.endpoint}`,
        headers: headers,
        data: {
          Data: baseRequest.config.body
        }
      });
      const data = response.data.Data;
      var result = new RequestResult(
        RequestResultType.pSuccess,
        response.status,
        response.data.message
      );
      result.data = data;
      return result;
    } catch (error) {
      Logger.showError(error);
      const status = error.response.status;
      switch (status) {
        case 419:
          if (user == null) {
            return;
          }
          var newToken = await this.renewAccessToken(baseRequest, user!);
          user.accessToken = newToken;
          await this.request(baseRequest, user);
        default:
          const result = new RequestResult(
            RequestResultType.nSuccess,
            status,
            error.response.data.message
          );
          return result;
      }
    }
  }

  /**
   * @summary 토큰 갱신을 한다.
   * @param baseRequest 요청에 필요한 기본적인 데이터 모델
   * @param user 클라이언트의 사용자 데이터 모델
   */
  async renewAccessToken(baseRequest: BaseRequest, user: User) {
    try {
      const response = await axios({
        method: "post",
        url: `${baseRequest.tokeRenewalURL}`,
        data: {
          Data: {
            clientSecretKey: user.clientSecretKey
          }
        }
      });
      const newAccessToken = response.data.Data.token;
      return newAccessToken;
    } catch (error) {
      Logger.showError(error);
      return null;
    }
  }
}

/**
 * @summary HTTP 서버통신의 요청 결과 데이터 모델 class
 * @name type 요청결과 타입
 * @name status 요청결과 status 값
 * @name message 요청결과 메세지
 * @name data 응답의 바디 데이터(JSON)
 * @name errorCode 서버에서 넘겨주는 에러코드 값
 */
class RequestResult {
  type: RequestResultType;
  status: Number;
  message: String;
  data?: object;
  errorCode?: Number;

  constructor(type: RequestResultType, status: Number, message: String) {
    this.type = type;
    this.status = status;
    this.message = message;
  }
}

/**
 * @summary HTTP 서버통신의 결과 타입
 * @member pSuccess Postive Success의 약자: 200번 영역의 status 값
 * @member nSuccess Negative Success의 약자: 400번 영역의 status 값
 * @member failure 서버통신 실패시
 */
enum RequestResultType {
  pSuccess,
  nSuccess,
  failure
}

/**
 * @summary 요청에 필요한 기본적인 데이터의 구성 인터페이스
 * @param baseURL 서버통신의 기본 URL
 * @param tokeRenewalURL 토큰 갱신을 위한 URL
 * @param config 주변환경값
 * @param addBody 바디에 들어가는 JSON형태(Object)의 데이터를 추가한다.
 */
interface BaseRequest {
  baseURL: String;
  tokeRenewalURL: String;
  config: RequestConfig;
  addBody(body: Object): void;
}

/**
 * @summary HTTP통신 요청을 위한 주변 환경값들을 저장하는 클래스
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

export { RequestManager, RequestConfig, Method, BaseRequest };
