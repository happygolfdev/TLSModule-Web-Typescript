/**
 * @interface User 모델의 기본 데이터를 가지고 있는 인터페이스
 * @const id 아이디
 * @const clientSecret 시크릿
 */
interface User {
  id: Number;
  clientSecret: String;
  token: String;
  data: any;
}

export { User };
