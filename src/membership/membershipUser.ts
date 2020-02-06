/**
 * @constant id User의 DB의 index
 * @constant uniqueID 서버가 User에게 제공한 고유값
 * @constant providedID 사용자가 직접 입력한 ID값 (이메일 또는 전화번호)
 * @constant name 사용자의 이름
 * @constant nickname 사용자의 닉네임
 * @constant loginType 로그인 타입(0: 직접, 1: Kakao, 2: Naver, 3: Google, 4: Apple)
 */
class MembershipUser {
  id: Number;
  uniqueID: String;
  providedID: String;
  name?: String;
  nickname?: String;
  loginType: Number;

  constructor(
    id: Number,
    uniqueID: String,
    providedID: String,
    name: String,
    nickname: String,
    loginType: Number
  ) {
    this.id = id;
    this.uniqueID = uniqueID;
    this.providedID = providedID;
    this.name = name;
    this.nickname = nickname;
    this.loginType = loginType;
  }
}

export { MembershipUser };
