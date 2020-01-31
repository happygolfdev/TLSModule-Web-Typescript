import { User } from "./user";

class ExampleUser implements User {
  id: Number;
  clientSecretKey: String;
  accessToken: String;
  nickname: String;
  mobile?: String;
  address?: String;

  static create(object: any) {
    return new ExampleUser(
      Number(object.id),
      object.clientSecret,
      object.token,
      object.nickname
    );
  }

  constructor(
    id: Number,
    clientSecretKey: String,
    fcmToken: String,
    nickname: String
  ) {
    this.id = id;
    this.clientSecretKey = clientSecretKey;
    this.accessToken = fcmToken;
    this.nickname = nickname;
  }
}

export { ExampleUser };
