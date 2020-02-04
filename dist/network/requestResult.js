"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @summary HTTP 서버통신의 요청 결과 데이터 모델 class
 * @name type 요청결과 타입
 * @name status 요청결과 status 값
 * @name message 요청결과 메세지
 * @name data 응답의 바디 데이터(JSON)
 * @name errorCode 서버에서 넘겨주는 에러코드 값
 */
var RequestResult = /** @class */ (function () {
    function RequestResult(type, status, message) {
        this.type = type;
        this.status = status;
        this.message = message;
    }
    return RequestResult;
}());
exports.RequestResult = RequestResult;
