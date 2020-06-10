import Axios from "axios";
import { Logger } from "../universal/logger";
import { ImpactVisionUser } from "./impactVisionUser";
import { ImpactVisionPlate } from "./impactVisionPlate";
import { repeat } from "../universal/universal";

class ImpactVisionManager {
  BASE_URL = "http://my.impactvision.co.kr/webapi";
  AUTH_ENDPOINT = "/callback.php";
  PLATE_CONTROL_ENPOINT = "/ctrl.v2.php";

  SHOP_PID = "happy_gf";
  SHOP_KEY = "MjdsMUxkME02Nk1GM2RiU2J2eVJqd2tuK2xKZE0rT3NBdkVSbU1SSXppcz0";

  /**
   * 입력한 훈련소(branch)에 회원의 가입
   * @param branchID 훈련소 지점 번호
   * @param username 아이디
   * @param name 이름
   * @param mobile 휴대폰 번호
   * @param nickname 닉네임
   */
  public async signUp(
    branchID: Number,
    username: String,
    name: String,
    mobile: String,
    nickname?: String
  ) {
    try {
      const password = await this.createPassword(username, name, mobile);
      const shopID = this.getBranchInfo(branchID)?.id;

      var url = [
        `${this.BASE_URL}${this.AUTH_ENDPOINT}?st_type=Join&`,
        `shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
        `&ivm_id=${username}`,
        `&ivm_pw=${password}`,
        `&ivm_name=${name}`,
        `&ivm_nick=${nickname}`,
        `&ivm_hp=${mobile}`,
      ].join("");

      const response = await Axios.get(encodeURI(url));
      const resultCode = response.data.impactvision.result_code;
      if (resultCode == "FAIL") {
        return {
          resultCode: resultCode,
          resultMessage: response.data.impactvision.result_message,
          data: {
            user: null,
          },
        };
      }

      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: {
          user: new ImpactVisionUser(response.data.impactvision.member_info),
        },
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: {
          user: null,
        },
      };
    }
  }

  /**
   * Impact Vision 계정 정보를 업데이트 합니다.
   * @param branchID 지점 번호
   * @param username 아이디
   * @param password 비밀번호
   * @param name 이름
   * @param nickname 닉네임
   * @param mobile 휴대폰 번호
   */
  public async update(
    branchID: Number,
    username: String,
    password: String,
    name?: String,
    nickname?: String,
    mobile?: String
  ) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      if (shopID == null) {
        return null;
      }
      const url = [
        `${this.BASE_URL}${this.AUTH_ENDPOINT}?st_type=Edit`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
        `&ivm_id=${username}`,
        `&ivm_pw=${password}`,
        `&ivm_pw_edit=${password}`,
      ];

      if (name != null) {
        url.push(`&ivm_name=${name}`);
      }

      if (nickname != null) {
        url.push(`&ivm_nick=${nickname}`);
      }

      if (mobile != null) {
        url.push(`&ivm_hp=${mobile}`);
      }

      const response = await Axios.get(encodeURI(url.join("")));

      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: null,
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: null,
      };
    }
  }

  /**
   * Impact Vision 계정을 삭제합니다.
   * @param branchID 지점 번호
   * @param username 아이디
   * @param password 비밀번호
   */
  public async deleteUser(
    branchID: Number,
    username: String,
    password: String
  ) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      if (shopID == null) {
        return null;
      }
      const url = [
        `${this.BASE_URL}${this.AUTH_ENDPOINT}?st_type=Delete`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
        `&ivm_id=${username}`,
        `&ivm_pw=${password}`,
        `&ivm_pw_edit=${password}`,
      ];

      const response = await Axios.get(encodeURI(url.join("")));
      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: null,
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: null,
      };
    }
  }

  /**
   * Impact Vision DB에서 사용자 아이디 중복검색을 합니다.
   * @param branchID 지점 번호
   * @param username 중복 검색할 아이디
   */
  public async checkUsername(branchID: Number, username: String) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      if (shopID == null) {
        return null;
      }
      const url = [
        `${this.BASE_URL}${this.AUTH_ENDPOINT}?st_type=Idcheck`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
        `&ivm_id=${username}`,
      ];

      const response = await Axios.get(encodeURI(url.join("")));

      const isAvailable =
        response.data.impactvision.result_code == "SUCCESS" ? false : true;

      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: {
          isAvailable: isAvailable,
        },
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: {
          isAvailable: null,
        },
      };
    }
  }

  /**
   * 사용자 목록보기
   * @param pageIndex 검색할 리스트의 index
   * @param branchID 지점 번호
   */
  public async getUserList(pageIndex: Number, branchID: Number) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      const url = [
        `${this.BASE_URL}${this.AUTH_ENDPOINT}?st_type=List`,
        `&page_idx=${pageIndex}`,
        `&page_line=100`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
      ].join("");

      const response = await Axios.get(url);
      const resultCode = response.data.impactvision.result_code;
      if (resultCode == "FAIL") {
        return {
          resultCode: resultCode,
          resultMessage: response.data.impactvision.result_message,
          data: {
            users: null,
          },
        };
      }

      const usersObjArray = response.data.impactvision.member_info;
      const users: ImpactVisionUser[] = await usersObjArray.map(
        async (userObj: any) => {
          return await new ImpactVisionUser(userObj);
        }
      );

      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: {
          users: users,
        },
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: {
          users: null,
        },
      };
    }
  }

  /**
   * 지점의 존재여부와 존재한다면 타석 리스트를 받아온다.
   * @param shopID 지점 아이디
   */
  public async checkBranch(shopID: String) {
    try {
      const url = [
        `${this.BASE_URL}${this.PLATE_CONTROL_ENPOINT}?st_type=List`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
      ].join("");

      const response = await Axios.get(encodeURI(url));
      const resultCode = response.data.impactvision.result_code;
      if (resultCode == "FAIL") {
        return {
          resultCode: resultCode,
          resultMessage: response.data.impactvision.result_message,
          data: null,
        };
      }

      const plateArray = response.data.impactvision.client_info;
      var plates: ImpactVisionPlate[] = [];
      await repeat(plateArray, async (plateObjc, idx) => {
        console.log(`${idx} ${plateObjc}`);
        const plate = new ImpactVisionPlate(idx, plateObjc);
        plates.push(plate);
      });

      const branchID = ImpactVisionManager.getBranchID(shopID);
      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: {
          branchID: branchID,
          plates: plates,
        },
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: null,
      };
    }
  }

  /**
   * 해당 지점의 모든 타석의 데이터를 받아온다.
   * @param branchID 지점 번호
   */
  public async getPlateList(branchID: Number) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      console.log(shopID);
      const url = [
        `${this.BASE_URL}${this.PLATE_CONTROL_ENPOINT}?st_type=List`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
      ].join("");

      const response = await Axios.get(encodeURI(url));
      const resultCode = response.data.impactvision.result_code;
      if (resultCode == "FAIL") {
        return {
          resultCode: resultCode,
          resultMessage: response.data.impactvision.result_message,
          data: {
            plates: null,
          },
        };
      }

      const plateArray = response.data.impactvision.client_info;
      var plates: ImpactVisionPlate[] = [];
      await repeat(plateArray, async (plateObjc, idx) => {
        console.log(`${idx} ${plateObjc}`);
        const plate = new ImpactVisionPlate(idx, plateObjc);
        plates.push(plate);
      });

      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: {
          plates: plates,
        },
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: {
          plates: null,
        },
      };
    }
  }

  /**
   * 해당 지점의 모든 타석과 타석주변장치의 현황을 받아온다.
   * @param branchID 지점 번호
   */
  public async getAllStatus(branchID: Number) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      console.log(shopID);
      const url = [
        `${this.BASE_URL}${this.PLATE_CONTROL_ENPOINT}?st_type=List`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
      ].join("");

      const response = await Axios.get(encodeURI(url));
      const resultCode = response.data.impactvision.result_code;
      if (resultCode == "FAIL") {
        return {
          resultCode: resultCode,
          resultMessage: response.data.impactvision.result_message,
          data: {
            status: null,
          },
        };
      }

      const plateArray = response.data.impactvision.client_info;
      var plates: ImpactVisionPlate[] = [];
      await repeat(plateArray, async (plateObjc, idx) => {
        console.log(`${idx} ${plateObjc}`);
        const plate = new ImpactVisionPlate(idx, plateObjc);
        plates.push(plate);
      });

      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: {
          plates: plates,
        },
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: {
          plates: null,
        },
      };
    }
  }

  /**
   * 타석 컴퓨터를 제어한다.
   * @param branchID 지점 번호
   * @param lockKey 제어할 타석의 lockKey
   * @param toBeOn 컴퓨터가 켜질지 아니면 꺼질지
   */
  public async controlComputer(
    branchID: Number,
    lockKey: String,
    toBeOn: Boolean
  ) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      const lockMode = toBeOn ? "pc_on" : "pc_off";
      const url = [
        `${this.BASE_URL}${this.PLATE_CONTROL_ENPOINT}?st_type=Ctrl`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
        `&client_lock_key=${lockKey}`,
        `&client_lock_mode=${lockMode}`,
      ].join("");

      const response = await Axios.get(encodeURI(url));
      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: null,
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: null,
      };
    }
  }

  /**
   * 타석 게임을 제어한다.
   * @param branchID 지점 번호
   * @param lockKey 제어할 타석의 lockKey
   * @param toBeOn 게임이 켜질지 아니면 꺼질지
   */
  public async controlGame(branchID: Number, lockKey: String, toBeOn: Boolean) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      const lockMode = toBeOn ? "game_on" : "game_off";
      const url = [
        `${this.BASE_URL}${this.PLATE_CONTROL_ENPOINT}?st_type=Ctrl`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
        `&client_lock_key=${lockKey}`,
        `&client_lock_mode=${lockMode}`,
      ].join("");

      const response = await Axios.get(encodeURI(url));
      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: null,
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: null,
      };
    }
  }

  /**
   * 타석 프로젝터를 제어한다.
   * @param branchID 지점 번호
   * @param lockKey 제어할 타석의 lockKey
   */
  public async controlProjector(branchID: Number, lockKey: String) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      const url = [
        `${this.BASE_URL}${this.PLATE_CONTROL_ENPOINT}?st_type=Ctrl`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
        `&client_lock_key=${lockKey}`,
        `&client_lock_mode=pj_signal`,
      ].join("");

      const response = await Axios.get(encodeURI(url));
      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: null,
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: null,
      };
    }
  }

  /**
   * 타석을 수동으로 시작한다.
   * @param branchID 지점 번호
   * @param lockKey 제어할 타석의 lockKey
   * @param duration 타석을 사용할 시간(분, 최대 1440분)
   */
  public async openPlate(branchID: Number, lockKey: String, duration: Number) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      const url = [
        `${this.BASE_URL}${this.PLATE_CONTROL_ENPOINT}?st_type=Ctrl`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
        `&client_lock_key=${lockKey}`,
        `&client_lock_mode=unlock`,
        `&client_lock_time=${duration}`,
      ].join("");

      const response = await Axios.get(encodeURI(url));
      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: null,
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: null,
      };
    }
  }

  /**
   * 강제로 타석을 종료한다.
   * @param branchID 지점 번호
   * @param lockKey 타석의 lockKey
   */
  public async shutPlate(branchID: Number, lockKey: String) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      const url = [
        `${this.BASE_URL}${this.PLATE_CONTROL_ENPOINT}?st_type=Ctrl`,
        `&shop_pid=${this.SHOP_PID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.SHOP_KEY}`,
        `&client_lock_key=${lockKey}`,
        `&client_lock_mode=lock`,
      ].join("");

      const response = await Axios.get(encodeURI(url));
      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: null,
      };
    } catch (error) {
      Logger.showError(String(error));
      return {
        resultCode: error.response.data.impactvision.result_code,
        resultMessage: error.response.data.impactvision.result_message,
        data: null,
      };
    }
  }

  private getBranchInfo(branchID: Number) {
    switch (branchID) {
      case 0: //삼성점
        return {
          id: "ivm060117",
          password: process.env.BRANCH_0,
        };
      case 1: // 위례점
        return {
          id: "ivm130147",
          password: process.env.BRANCH_1,
        };
      case 2: //성북점
        return {
          id: "ivm020109",
          password: process.env.BRANCH_2,
        };
      case 3: //서현
        return {
          id: "ivm130197",
          password: process.env.BRANCH_3,
        };
      default:
        return null;
    }
  }

  static getBranchID(shopID: String): Number {
    switch (shopID) {
      case "ivm060117": //삼성
        return 0;
      case "ivm130147": //위례
        return 1;
      case "ivm020109": //성북
        return 2;
      case "ivm130197": //서현
        return 3;
      case "잠실":
        return 4;
      case "평촌":
        return 5;
      case "정자":
        return 6;
      case "의왕":
        return 7;
      default:
        return 999;
    }
  }

  async createPassword(id: String, name: String, mobile: String) {
    return `${id}_${name}_${mobile}`;
  }
}

export { ImpactVisionManager };
