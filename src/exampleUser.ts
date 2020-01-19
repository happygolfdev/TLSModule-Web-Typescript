import { User } from "./user";

class ExampleUser implements User {
  id: Number;
  clientSecret: String;
  token: String;
  data: any;
  nickname: String;

  static create(object: any) {
    return new ExampleUser(
      Number(object.id),
      object.clientSecret,
      object.token,
      object.data,
      object.nickname
    );
  }

  constructor(
    id: Number,
    clientSecret: String,
    token: String,
    data: Object,
    nickname: String
  ) {
    this.id = id;
    this.clientSecret = clientSecret;
    this.token = token;
    this.data = data;
    this.nickname = nickname;
  }
}

export { ExampleUser };
