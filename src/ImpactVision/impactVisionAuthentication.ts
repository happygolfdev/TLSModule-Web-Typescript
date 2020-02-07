import Axios from "axios";
import { Logger } from "../universal/logger";
import { ImpactVisionUser } from "./impactVisionUser";

class ImpactVisionAuthentication {
  baseURL = "http://my.impactvision.co.kr/webapi/callback.php";
  shopPID = "happy_gf";
  shopKey = "MjdsMUxkME02Nk1GM2RiU2J2eVJqd2tuK2xKZE0rT3NBdkVSbU1SSXppcz0";

  /**
   *
   * @param branchID 훈련소 지점
   * @param id
   * @param name
   * @param mobile
   * @param nickname
   */
  public async signUp(
    branchID: Number,
    id: String,
    name: String,
    mobile: String,
    nickname?: String
  ) {
    try {
      const password = await this.createPassword(id, name, mobile);
      const shopID = this.getBranchInfo(branchID)?.id;

      var url = [
        `${this.baseURL}?st_type=Join&`,
        `shop_pid=${this.shopPID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.shopKey}`,
        `&ivm_id=${id}`,
        `&ivm_pw=${password}`,
        `&ivm_name=${name}`,
        `&ivm_nick=${nickname}`,
        `&ivm_hp=${mobile}`
      ].join("");

      const response = await Axios.get(url);
      const isSuccessful =
        response.data.impactvision.result_code == "SUCCESS" ? true : false;

      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message,
        data: isSuccessful
          ? new ImpactVisionUser(response.data.impactvision.member_info)
          : null
      };
    } catch (error) {
      Logger.showError(String(error));
      return error;
    }
  }

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
        `${this.baseURL}?st_type=Edit`,
        `&shop_pid=${this.shopPID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.shopKey}`,
        `&ivm_id=${username}`,
        `&ivm_pw=${password}`,
        `&ivm_pw_edit=${password}`
      ];

      if (name != null) {
        url.push(`&ivm_name=${name}`);
      }

      if (nickname != null) {
        url.push(`&ivm_nick=${nickname}`);
      }

      if (name != null) {
        url.push(`&ivm_hp=${mobile}`);
      }

      const response = await Axios.get(url.join(""));
      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message
      };
    } catch (error) {
      Logger.showError(String(error));
      return error;
    }
  }

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
        `${this.baseURL}?st_type=Delete`,
        `&shop_pid=${this.shopPID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.shopKey}`,
        `&ivm_id=${username}`,
        `&ivm_pw=${password}`,
        `&ivm_pw_edit=${password}`
      ];

      const response = await Axios.get(url.join(""));
      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message
      };
    } catch (error) {
      Logger.showError(String(error));
      return error;
    }
  }

  public async checkUsername(branchID: Number, username: String) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      if (shopID == null) {
        return null;
      }
      const url = [
        `${this.baseURL}?st_type=Idcheck`,
        `&shop_pid=${this.shopPID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.shopKey}`,
        `&ivm_id=${username}`
      ];

      const response = await Axios.get(url.join(""));
      return {
        resultCode: response.data.impactvision.result_code,
        resultMessage: response.data.impactvision.result_message
      };
    } catch (error) {
      Logger.showError(String(error));
      return error;
    }
  }

  public async getUserList(pageIndex: Number, branchID: Number) {
    try {
      const shopID = this.getBranchInfo(branchID)?.id;
      const url = [
        `${this.baseURL}?st_type=List`,
        `&page_idx=${pageIndex}`,
        `&page_line=100`,
        `&shop_pid=${this.shopPID}`,
        `&shop_id=${shopID}`,
        `&shop_key=${this.shopKey}`
      ].join("");

      const response = await Axios.get(url);
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
          Users: users
        }
      };
    } catch (error) {
      Logger.showError(String(error));
      return error;
    }
  }

  private getBranchInfo(branchID: Number) {
    switch (branchID) {
      case 0:
        return {
          id: "ivm060117",
          password: process.env.BRANCH_0
        };
      case 1:
        return {
          id: "ivm130147",
          password: process.env.BRANCH_1
        };
      case 2:
        return {
          id: "ivm020109",
          password: process.env.BRANCH_2
        };
      default:
        return null;
    }
  }

  static getBranchID(branchID: String) {
    switch (branchID) {
      case "ivm060117":
        return 0;
      case "ivm130147":
        return 1;
      case "ivm020109":
        return 2;
      default:
        return 999;
    }
  }

  private async createPassword(id: String, name: String, mobile: String) {
    return `${id}_${name}_${mobile}`;
  }
}

export { ImpactVisionAuthentication };
