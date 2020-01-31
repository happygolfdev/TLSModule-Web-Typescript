import { ExampleRequest, RequestType } from "./exampleRequest";
import { RequestManager } from "./request";
import { ExampleUser } from "./exampleUser";
import { repeat, response } from "./utils";
import { Logger } from "./logger";
import { ExmapleUserManager } from "./exampleUserManager";

async function doExampleRequest() {
  const requestManager = new RequestManager();
  const request = new ExampleRequest(RequestType.signIn);
  const body = {
    email: "jjdeui0308@gmail.com",
    loginType: 3,
    fcmToken: "adsf",
    provider_token: "null",
    password: "aaaa1111",
    sysLang: 0
  };

  request.addBody(body);

  const result = await requestManager.request(request);
  return result;
}

repeat([1, 2, 3], async (value, index) => {
  Logger.showMessage(`${index}번째 값: ${value}`);
});

const exampleUser = new ExampleUser(1, "asdf", "Asdf", "nickname");
