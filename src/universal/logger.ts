/**
 * @summary 콘솔에 로그를 출력하는 클래스
 */
class Logger {
  /**
   * @summmary 에러 로그를 출력한다
   * @param message 에러 메세지 내용
   */
  static showError(message: String) {
    console.log(`${Date()}: 😱  ${message}`);
  }

  /**
   * @summary 일반적인 로그 메세지를 출력한다
   * @param message 메세지 내용
   */
  static showMessage(message: String) {
    console.log(`${Date()}: 😎  ${message}`);
  }
}

export { Logger };
