/**
 * @interface User 모델의 기본 데이터를 가지고 있는 인터페이스
 * @const id 아이디
 * @const clientSecret 시크릿
 */
class User extends Object {
  id: Number;
  clientSecretKey: String;
  accessToken: String;

  constructor(id: Number, clientSecretKey: String, accessToken: String) {
    super();
    this.id = id;
    this.clientSecretKey = clientSecretKey;
    this.accessToken = accessToken;
  }

  static create(obj: any): User {
    return new User(Number(obj.id), obj.clientSecret, obj.token);
  }
}

export { User };
