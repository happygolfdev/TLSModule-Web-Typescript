"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exampleUser_1 = require("./exampleUser");
var logger_1 = require("../universal/logger");
var ExmapleUserManager = /** @class */ (function () {
    function ExmapleUserManager() {
        this.KEY = "tls_exmaple_user_Key";
    }
    ExmapleUserManager.prototype.getUser = function () {
        var dataString = window.localStorage.getItem(String(this.KEY));
        if (dataString == null) {
            logger_1.Logger.showError("no data String for User saved in the local storage");
            return null;
        }
        return exampleUser_1.ExampleUser.create(JSON.parse(dataString));
    };
    ExmapleUserManager.prototype.setUser = function (user) {
        var userString = JSON.stringify(user);
        window.localStorage.setItem("tls_client", userString);
        logger_1.Logger.showMessage("User data has been set.");
    };
    ExmapleUserManager.prototype.resetToken = function (newToken) {
        var user = this.getUser();
        if (user == null) {
            logger_1.Logger.showError("User is null");
            return;
        }
        user.accessToken = newToken;
        logger_1.Logger.showMessage("User's token has been renewed.");
    };
    return ExmapleUserManager;
}());
exports.ExmapleUserManager = ExmapleUserManager;
