import { UserManager } from "../userManagement/userManager";
import { ExampleUser } from "./exampleUser";
import { Logger } from "../universal/logger";

class ExmapleUserManager implements UserManager<ExampleUser> {
  KEY: String = "tls_exmaple_user_Key";

  getUser(): ExampleUser | null {
    const dataString = window.localStorage.getItem(String(this.KEY));
    if (dataString == null) {
      Logger.showError("no data String for User saved in the local storage");
      return null;
    }
    return ExampleUser.create(JSON.parse(dataString));
  }

  setUser(user: ExampleUser): void {
    const userString = JSON.stringify(user);
    window.localStorage.setItem("tls_client", userString);
    Logger.showMessage("User data has been set.");
  }

  resetToken(newToken: String): void {
    const user = this.getUser();
    if (user == null) {
      Logger.showError("User is null");
      return;
    }
    user.accessToken = newToken;
    Logger.showMessage("User's token has been renewed.");
  }
}

export { ExmapleUserManager };
