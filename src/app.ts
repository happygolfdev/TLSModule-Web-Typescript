import { Logger } from "./logger";
import { ExampleRequest, RequestType } from "./exampleRequest";
import { RequestManager } from "./request";
import { ExampleUser } from "./exampleUser";
import { UserManager } from "./userManager";

async function doExampleRequest() {
  const requestManager = new RequestManager();
  const request = new ExampleRequest(RequestType.signIn);
  const body = {
    email: "jjeui0308@gmail.com",
    loginType: 3,
    fcmToken: "adsf",
    provider_token: "null",
    password: "aaaa1111",
    sysLang: 0
  };
  request.addBody(body);

  const result = await requestManager.request(request);
  console.log(result);
}
const exampleUser = new ExampleUser(1, "asdf", "Asdf", "asdf", "nickname");
const jsonString = JSON.stringify(exampleUser);
const userObject = JSON.parse(jsonString);
const user = ExampleUser.create(userObject);
console.log(user);
// const userManger = new UserManager<ExampleUser>();
// userManger.setUser(exampleUser);

// doExampleRequest();
