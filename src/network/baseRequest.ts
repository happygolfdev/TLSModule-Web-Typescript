import { RequestConfig } from "./requestConfig";

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

export { BaseRequest };
