"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @summary 콘솔에 로그를 출력하는 클래스
 */
var Logger = /** @class */ (function () {
    function Logger() {
    }
    /**
     * @summmary 에러 로그를 출력한다
     * @param message 에러 메세지 내용
     */
    Logger.showError = function (message) {
        console.log(Date() + ": \uD83D\uDE31  " + message);
    };
    /**
     * @summary 일반적인 로그 메세지를 출력한다
     * @param message 메세지 내용
     */
    Logger.showMessage = function (message) {
        console.log(Date() + ": \uD83D\uDE0E  " + message);
    };
    return Logger;
}());
exports.Logger = Logger;
