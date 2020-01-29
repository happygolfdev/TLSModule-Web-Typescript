import { User } from "./user";

/**
 * @summary 클라이언트에서 사용자 데이터를 로컬 스토리지에 저장하고 관리하는 매니져 클래스
 */
class UserManager {
  private key: String = "tls_client";

  /**
   * @summary 저장되어 있는 사용자 데이터를 받아온다
   */
  public getUser() {
    const dataString = window.localStorage.getItem(String(this.key));
    if (dataString == null) {
      return null;
    }

    return JSON.parse(dataString);
  }

  /**
   * @summary 사용자 데이터를 로컬스토리지에 저장한다.
   * @param user 사용자 데이터의 Object
   */
  public setUser(user: User) {
    const userString = JSON.stringify(user);
    window.localStorage.setItem("tls_client", userString);
  }

  public resetToken(newToken: String) {}
}

export { UserManager };
