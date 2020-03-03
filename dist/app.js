"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var exampleUser_1 = require("./examples/exampleUser");
var logger_1 = require("./universal/logger");
var membershipManager_1 = require("./membership/membershipManager");
var impactVisionManager_1 = require("./ImpactVision/impactVisionManager");
var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc5MDA4MzgwLCJleHAiOjE1ODI2MDgzODAsImlzcyI6IkFydGlsZWFybiJ9.kkYmp6yN8HiveOjBA5ZbPst0z7Bu-KX-X-q8t1govwM";
var clientSecretKey = "7918c66fd8d7792a73ce0730dde6823ed07b1f7d259bf3c26f5c8d3517b1d3a5a00715d71abf187208e4aa334e447752";
function renew() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, newToken, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, membershipManager_1.MembershipManager.renewAccessToken(clientSecretKey)];
                case 1:
                    _a = _b.sent(), newToken = _a.newToken, error = _a.error;
                    accessToken = newToken;
                    logger_1.Logger.showMessage(accessToken);
                    return [2 /*return*/];
            }
        });
    });
}
var ivManager = new impactVisionManager_1.ImpactVisionManager();
function signUpForIV() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ivManager.signUp(0, "test09", "justinji", "01067991866", "justin")];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function userList() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ivManager.getUserList(0, 0)];
                case 1:
                    result = _a.sent();
                    console.log(result.data.users);
                    return [2 /*return*/];
            }
        });
    });
}
function plateList() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ivManager.getPlateList(0)];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function userUpdate() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ivManager.update(0, "test08", "aaaa1111", "new name", "new nicname", "01022222222")];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function userDelete() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ivManager.deleteUser(0, "test09", "aaaa1111")];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function checkImpactVisionUsername() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ivManager.checkUsername(0, "test09")];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function signUp() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, error, status, User;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, membershipManager_1.MembershipManager.signUp(accessToken, "mteaasaat01@srg.com", 1, "asdf", 0, "nickname")];
                case 1:
                    _a = _b.sent(), error = _a.error, status = _a.status, User = _a.User;
                    console.log(error);
                    console.log(status);
                    console.log(User);
                    return [2 /*return*/];
            }
        });
    });
}
function reset() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, error, status, User;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, membershipManager_1.MembershipManager.resetPassword(accessToken, 11, "null")];
                case 1:
                    _a = _b.sent(), error = _a.error, status = _a.status, User = _a.User;
                    console.log(error);
                    console.log(status);
                    console.log(User);
                    return [2 /*return*/];
            }
        });
    });
}
function check() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, error, isAvailable;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, membershipManager_1.MembershipManager.checkEmail(accessToken, "ajajeui0308@gmail.com", 0)];
                case 1:
                    _a = _b.sent(), error = _a.error, isAvailable = _a.isAvailable;
                    console.log(isAvailable);
                    return [2 /*return*/];
            }
        });
    });
}
var exampleUser = new exampleUser_1.ExampleUser(1, "asdf", "Asdf", "nickname");
