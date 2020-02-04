import { User } from "../userManagement/user";
import axios from "axios";
import { Logger } from "../universal/logger";
import { RequestResult } from "./requestResult";
import { RequestResultType } from "./requestResultType";
import { BaseRequest } from "./baseRequest";

/**
 * HTTP 서버통신의 요청작업을 수행하는 클래스
 */
class RequestManager {
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
          var { newToken } = await this.renewAccessToken(baseRequest, user!);
          user.accessToken = newToken;
          await this.request(baseRequest, user);
        case 500: {
          const result = new RequestResult(
            RequestResultType.failure,
            status,
            error.response.data.message
          );
          return result;
        }
        default: {
          const result = new RequestResult(
            RequestResultType.nSuccess,
            status,
            error.response.data.message
          );
          return result;
        }
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
      return {
        newToken: newAccessToken
      };
    } catch (error) {
      Logger.showError(error);
      return {
        newToken: null
      };
    }
  }
}

export { RequestManager };
