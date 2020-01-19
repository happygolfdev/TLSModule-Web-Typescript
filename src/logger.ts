class Logger {
  static showError(message: String) {
    console.log(`${Date()}: 😱  ${message}`);
  }

  static showMessage(message: String) {
    console.log(`${Date()}: 😎  ${message}`);
  }
}

export { Logger };
