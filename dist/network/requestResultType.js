"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @summary HTTP 서버통신의 결과 타입
 * @member pSuccess Postive Success의 약자: 200번 영역의 status 값
 * @member nSuccess Negative Success의 약자: 400번 영역의 status 값
 * @member failure 서버통신 실패시
 */
var RequestResultType;
(function (RequestResultType) {
    RequestResultType[RequestResultType["pSuccess"] = 0] = "pSuccess";
    RequestResultType[RequestResultType["nSuccess"] = 1] = "nSuccess";
    RequestResultType[RequestResultType["failure"] = 2] = "failure";
})(RequestResultType || (RequestResultType = {}));
exports.RequestResultType = RequestResultType;
