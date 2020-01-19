import { User } from "./user";

class UserManager {
  private key: String = "tls_client";

  public getUser() {
    const dataString = window.localStorage.getItem(String(this.key));
    if (dataString == null) {
      return null;
    }

    return JSON.parse(dataString);
  }

  public setUser(user: any) {
    const userString = JSON.stringify(user);
    window.localStorage.setItem("tls_client", userString);
  }
}

export { UserManager };
