import { ImpactVisionManager } from "./impactVisionManager";

class ImpactVisionUser {
  id: Number;
  username: String;
  password: String;
  name: String;
  nickname: String;
  mobile: String;
  branchID: Number;

  constructor(object: any) {
    this.id = Number(object.ivm_index);
    this.username = object.ivm_id;
    this.password = object.ivm_pw;
    this.name = object.ivm_name;
    this.nickname = object.ivm_nick;
    this.mobile = object.ivm_hp;
    this.branchID = ImpactVisionManager.getBranchID(object.shop_id);
  }
}

export { ImpactVisionUser };
