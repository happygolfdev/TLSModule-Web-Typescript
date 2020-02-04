/**
 * @summary HTTP 서버통신의 결과 타입
 * @member pSuccess Postive Success의 약자: 200번 영역의 status 값
 * @member nSuccess Negative Success의 약자: 400번 영역의 status 값
 * @member failure 서버통신 실패시
 */
enum RequestResultType {
  pSuccess,
  nSuccess,
  failure
}

export { RequestResultType };
