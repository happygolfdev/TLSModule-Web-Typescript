"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @interface User 모델의 기본 데이터를 가지고 있는 인터페이스
 * @const id 아이디
 * @const clientSecret 시크릿
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(id, clientSecretKey, accessToken) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.clientSecretKey = clientSecretKey;
        _this.accessToken = accessToken;
        return _this;
    }
    User.create = function (obj) {
        return new User(Number(obj.id), obj.clientSecret, obj.token);
    };
    return User;
}(Object));
exports.User = User;
