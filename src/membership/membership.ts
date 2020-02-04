import axios from "axios";
import { Logger } from "../universal/logger";

class MembershipManager {
  static baseURL: String = "http://13.125.19.122";

  /**
   * 클라이언트 서버의 Access Token을 갱신한다.
   * @param clientSecretKey 클라이언트 서버에 주어진 보안키
   * @returns newToken: String?, error: any?
   * //MARK: Access Token 갱신
   */
  static async renewAccessToken(clientSecretKey: String) {
    try {
      Logger.showMessage(clientSecretKey);
      const response = await axios.post(`${this.baseURL}/v1`, {
        Data: {
          clientSecret: clientSecretKey
        }
      });

      const newToken = response.data.Data.token;
      return {
        newToken: newToken,
        error: null
      };
    } catch (error) {
      return {
        newToken: null,
        error: error
      };
    }
  }

  /**
   * Membership 데이터 베이스에 새로운 가입자를 추가한다
   * @param accessToken 클라이언트 서버 access token
   * @param email 사용자 이메일
   * @param loginType 로그인 타입
   * @param password 비밀번호
   * @param serviceType 클라이언트 서비스 번호(GolfRoad72: 0)
   * @param name 이름
   * @param nickname 닉네임
   */
  static async signUp(
    accessToken: String,
    email: String,
    loginType: Number,
    password: String,
    serviceType: Number,
    name?: String,
    nickname?: String
  ) {
    try {
      const response = await axios.post(
        `${this.baseURL}/auth/signup`,
        {
          Data: {
            serviceType: serviceType,
            email: email,
            loginType: loginType,
            password: password,
            name: name,
            nickname: nickname
          }
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`
          }
        }
      );

      const user = response.data.Data.User;

      const mUser = new MembershipUser(
        user.id,
        user.email,
        user.name,
        user.nickname,
        user.loginType
      );

      return {
        error: null,
        status: 200,
        User: mUser
      };
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
        User: null
      };
    }
  }

  /**
   * 사용자 정보 업데이트
   * @param accessToken 클라이언트 서버의 access token
   * @param id Membership User의 id
   * @param serviceType 클라이언트 서비스 번호(GolfRoad72: 0)
   * @param name 변경할 사용자의 이름
   * @param nickname 변경할 사용자의 닉네임
   */
  static async update(
    accessToken: String,
    id: Number,
    serviceType: Number,
    name?: String,
    nickname?: String
  ) {
    try {
      const response = await axios.put(
        `${this.baseURL}/auth/user`,
        {
          Data: {
            userID: id,
            serviceType: serviceType,
            name: name,
            nickname: nickname
          }
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`
          }
        }
      );
      const user = response.data.Data.User;

      const mUser = new MembershipUser(
        user.id,
        user.email,
        user.name,
        user.nickname,
        user.loginType
      );

      return {
        error: null,
        status: 200,
        User: mUser
      };
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
        User: null
      };
    }
  }

  /**
   * Membership 사용자의 email 중복체크
   * @param accessToken 클라이언트 서버의 access token
   * @param email 중복 체크할 이메일
   * @param serviceType 클라이언트 서비스 번호(GolfRoad72: 0)
   */
  static async checkEmail(
    accessToken: String,
    email: String,
    serviceType: Number
  ) {
    try {
      const response = await axios.post(
        `${this.baseURL}/auth/user`,
        {
          Data: {
            email: email,
            serviceType: serviceType
          }
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`
          }
        }
      );

      let user = response.data.Data.User;

      if (user == null) {
        Logger.showMessage(" no Membership User found");
        return {
          error: null,
          isAvailable: true
        };
      }

      return {
        error: null,
        isAvailable: false
      };
    } catch (error) {
      Logger.showError(error);
      return {
        error: error,
        isAvailable: null
      };
    }
  }

  /**
   * Membership User의 비밀번호 변경
   * @param accessToken 클라이언트 서버의 access token
   * @param id Membership User의 id
   * @param password 변결할 비밀번호
   */
  static async resetPassword(
    accessToken: String,
    id: Number,
    password: String
  ) {
    try {
      const response = await axios.put(
        `${this.baseURL}/auth/user`,
        {
          Data: {
            userID: id,
            serviceType: 0,
            password: password
          }
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`
          }
        }
      );
      const user = response.data.Data.User;

      const mUser = new MembershipUser(
        user.id,
        user.email,
        user.name,
        user.nickname,
        user.loginType
      );

      return {
        error: null,
        status: 200,
        User: mUser
      };
    } catch (error) {
      Logger.showError(error);
      return {
        error: error.response.data.message,
        status: error.response.status,
        User: null
      };
    }
  }

  /**
   *
   * @param accessToken 클라이언트 서버의 access token
   * @param id Membership User의 id
   * @param serviceType 클라이언트 서비스 번호(GolfRoad72: 0)
   */
  static async deactivate(
    accessToken: String,
    id: Number,
    serviceType: Number
  ) {
    try {
      const response = await axios.put(
        `${this.baseURL}/auth/user/status`,
        {
          Data: {
            userID: id,
            serviceType: serviceType
          }
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`
          }
        }
      );

      const user = response.data.Data.User;
      const mUser = new MembershipUser(
        user.id,
        user.email,
        user.name,
        user.nickname,
        user.loginType
      );

      return {
        error: null,
        status: 200,
        User: mUser
      };
    } catch (error) {
      Logger.showError(error);
      return {
        error: error.response.data.message,
        status: error.response.status,
        User: null
      };
    }
  }
}

class MembershipUser {
  id: Number;
  email: String;
  name?: String;
  nickname?: String;
  loginType: Number;

  constructor(
    id: Number,
    email: String,
    name: String,
    nickname: String,
    loginType: Number
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.nickname = nickname;
    this.loginType = loginType;
  }
}

export { MembershipManager, MembershipUser };
