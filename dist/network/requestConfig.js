"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HTTP통신 요청을 위한 주변 환경값들을 저장하는 클래스
 */
var RequestConfig = /** @class */ (function () {
    function RequestConfig(endpoint, method) {
        this.endpoint = endpoint;
        this.method = method;
    }
    return RequestConfig;
}());
exports.RequestConfig = RequestConfig;
/**
 * @summary HTTP통신의 METHOD
 */
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
    Method["put"] = "put";
    Method["delete"] = "delete";
})(Method || (Method = {}));
exports.Method = Method;
