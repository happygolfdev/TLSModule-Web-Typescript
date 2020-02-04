"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExampleUser = /** @class */ (function () {
    function ExampleUser(id, clientSecretKey, fcmToken, nickname) {
        this.id = id;
        this.clientSecretKey = clientSecretKey;
        this.accessToken = fcmToken;
        this.nickname = nickname;
    }
    ExampleUser.create = function (object) {
        return new ExampleUser(Number(object.id), object.clientSecret, object.token, object.nickname);
    };
    return ExampleUser;
}());
exports.ExampleUser = ExampleUser;
