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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var logger_1 = require("../universal/logger");
var membershipUser_1 = require("./membershipUser");
/**
 * Artilearn의 메인 DB에 사용자들의 데이터들을 관리하게 도와주는 클래스
 */
var MembershipManager = /** @class */ (function () {
    function MembershipManager() {
    }
    /**
     * 클라이언트 서버의 Access Token을 갱신한다.
     * @param clientSecretKey 클라이언트 서버에 주어진 보안키
     * @returns newToken: String?, error: any?
     * //MARK: Access Token 갱신
     */
    MembershipManager.renewAccessToken = function (clientSecretKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, newToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logger_1.Logger.showMessage(clientSecretKey);
                        return [4 /*yield*/, axios_1.default.post(this.baseURL + "/v1", {
                                Data: {
                                    clientSecret: clientSecretKey
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        newToken = response.data.Data.token;
                        return [2 /*return*/, {
                                newToken: newToken,
                                error: null
                            }];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                newToken: null,
                                error: error_1
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Membership 데이터 베이스에 새로운 가입자를 추가한다
     * @param accessToken 클라이언트 서버 access token
     * @param providedID 사용자 가입 아이디(이메일, 전화번호 등등)
     * @param loginType 로그인 타입
     * @param password 비밀번호
     * @param serviceType 클라이언트 서비스 번호(GolfRoad72: 0)
     * @param name 이름
     * @param nickname 닉네임
     */
    MembershipManager.signUp = function (accessToken, providedID, loginType, password, serviceType, name, nickname) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user, mUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(this.baseURL + "/auth/signup", {
                                Data: {
                                    serviceType: serviceType,
                                    providedID: providedID,
                                    loginType: loginType,
                                    password: password,
                                    name: name,
                                    nickname: nickname
                                }
                            }, {
                                headers: {
                                    Authorization: "bearer " + accessToken
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        user = response.data.Data.User;
                        mUser = new membershipUser_1.MembershipUser(user.id, user.uniqueID, user.providedID, user.name, user.nickname, user.loginType);
                        return [2 /*return*/, {
                                error: null,
                                status: 200,
                                User: mUser
                            }];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                error: error_2.response.data.message,
                                status: error_2.response.status,
                                User: null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 사용자 정보 업데이트
     * @param accessToken 클라이언트 서버의 access token
     * @param id Membership User의 id
     * @param serviceType 클라이언트 서비스 번호(GolfRoad72: 0)
     * @param name 변경할 사용자의 이름
     * @param nickname 변경할 사용자의 닉네임
     */
    MembershipManager.update = function (accessToken, id, serviceType, name, nickname) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user, mUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put(this.baseURL + "/auth/user", {
                                Data: {
                                    userID: id,
                                    serviceType: serviceType,
                                    name: name,
                                    nickname: nickname
                                }
                            }, {
                                headers: {
                                    Authorization: "bearer " + accessToken
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        user = response.data.Data.User;
                        mUser = new membershipUser_1.MembershipUser(user.id, user.uniqueID, user.providedID, user.name, user.nickname, user.loginType);
                        return [2 /*return*/, {
                                error: null,
                                status: 200,
                                User: mUser
                            }];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, {
                                error: error_3.response.data.message,
                                status: error_3.response.status,
                                User: null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Membership 사용자의 email 중복체크
     * @param accessToken 클라이언트 서버의 access token
     * @param providedID 중복 체크할 사용자의 아이디
     * @param serviceType 클라이언트 서비스 번호(GolfRoad72: 0)
     */
    MembershipManager.checkEmail = function (accessToken, providedID, serviceType) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(this.baseURL + "/auth/user", {
                                Data: {
                                    providedID: providedID,
                                    serviceType: serviceType
                                }
                            }, {
                                headers: {
                                    Authorization: "bearer " + accessToken
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        user = response.data.Data.User;
                        console.log(user);
                        if (user == null) {
                            logger_1.Logger.showMessage(" no Membership User found");
                            return [2 /*return*/, {
                                    error: null,
                                    isAvailable: true
                                }];
                        }
                        return [2 /*return*/, {
                                error: null,
                                isAvailable: false
                            }];
                    case 2:
                        error_4 = _a.sent();
                        logger_1.Logger.showError(error_4);
                        switch (error_4.response.status) {
                            case 404:
                                return [2 /*return*/, {
                                        error: error_4,
                                        isAvailable: true
                                    }];
                            default:
                                return [2 /*return*/, {
                                        error: error_4,
                                        isAvailable: null
                                    }];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Membership User의 비밀번호 변경
     * @param accessToken 클라이언트 서버의 access token
     * @param id Membership User의 id
     * @param password 변결할 비밀번호
     */
    MembershipManager.resetPassword = function (accessToken, id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user, mUser, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put(this.baseURL + "/auth/user", {
                                Data: {
                                    userID: id,
                                    serviceType: 0,
                                    password: password
                                }
                            }, {
                                headers: {
                                    Authorization: "bearer " + accessToken
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        user = response.data.Data.User;
                        mUser = new membershipUser_1.MembershipUser(user.id, user.uniqueID, user.providedID, user.name, user.nickname, user.loginType);
                        return [2 /*return*/, {
                                error: null,
                                status: 200,
                                User: mUser
                            }];
                    case 2:
                        error_5 = _a.sent();
                        logger_1.Logger.showError(error_5);
                        return [2 /*return*/, {
                                error: error_5.response.data.message,
                                status: error_5.response.status,
                                User: null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param accessToken 클라이언트 서버의 access token
     * @param id Membership User의 id
     * @param serviceType 클라이언트 서비스 번호(GolfRoad72: 0)
     */
    MembershipManager.deactivate = function (accessToken, id, serviceType) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user, mUser, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put(this.baseURL + "/auth/user/status", {
                                Data: {
                                    userID: id,
                                    serviceType: serviceType
                                }
                            }, {
                                headers: {
                                    Authorization: "bearer " + accessToken
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        user = response.data.Data.User;
                        mUser = new membershipUser_1.MembershipUser(user.id, user.uniqueID, user.providedID, user.name, user.nickname, user.loginType);
                        return [2 /*return*/, {
                                error: null,
                                status: 200,
                                User: mUser
                            }];
                    case 2:
                        error_6 = _a.sent();
                        logger_1.Logger.showError(error_6);
                        return [2 /*return*/, {
                                error: error_6.response.data.message,
                                status: error_6.response.status,
                                User: null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MembershipManager.baseURL = "http://13.125.19.122";
    return MembershipManager;
}());
exports.MembershipManager = MembershipManager;
