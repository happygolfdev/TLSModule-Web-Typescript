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
var impactVisionUser_1 = require("./impactVisionUser");
var ImpactVisionAuthentication = /** @class */ (function () {
    function ImpactVisionAuthentication() {
        this.baseURL = "http://my.impactvision.co.kr/webapi/callback.php";
        this.shopPID = "happy_gf";
        this.shopKey = "MjdsMUxkME02Nk1GM2RiU2J2eVJqd2tuK2xKZE0rT3NBdkVSbU1SSXppcz0";
    }
    /**
     *
     * @param branchID 훈련소 지점 번호
     * @param username 아이디
     * @param name 이름
     * @param mobile 휴대폰 번호
     * @param nickname 닉네임
     */
    ImpactVisionAuthentication.prototype.signUp = function (branchID, username, name, mobile, nickname) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var password, shopID, url, response, isSuccessful, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.createPassword(username, name, mobile)];
                    case 1:
                        password = _b.sent();
                        shopID = (_a = this.getBranchInfo(branchID)) === null || _a === void 0 ? void 0 : _a.id;
                        url = [
                            this.baseURL + "?st_type=Join&",
                            "shop_pid=" + this.shopPID,
                            "&shop_id=" + shopID,
                            "&shop_key=" + this.shopKey,
                            "&ivm_id=" + username,
                            "&ivm_pw=" + password,
                            "&ivm_name=" + name,
                            "&ivm_nick=" + nickname,
                            "&ivm_hp=" + mobile
                        ].join("");
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        response = _b.sent();
                        isSuccessful = response.data.impactvision.result_code == "SUCCESS" ? true : false;
                        return [2 /*return*/, {
                                resultCode: response.data.impactvision.result_code,
                                resultMessage: response.data.impactvision.result_message,
                                data: isSuccessful
                                    ? new impactVisionUser_1.ImpactVisionUser(response.data.impactvision.member_info)
                                    : null
                            }];
                    case 3:
                        error_1 = _b.sent();
                        logger_1.Logger.showError(String(error_1));
                        return [2 /*return*/, error_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Impact Vision 계정 정보를 업데이트 합니다.
     * @param branchID 지점 번호
     * @param username 아이디
     * @param password 비밀번호
     * @param name 이름
     * @param nickname 닉네임
     * @param mobile 휴대폰 번호
     */
    ImpactVisionAuthentication.prototype.update = function (branchID, username, password, name, nickname, mobile) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var shopID, url, response, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        shopID = (_a = this.getBranchInfo(branchID)) === null || _a === void 0 ? void 0 : _a.id;
                        if (shopID == null) {
                            return [2 /*return*/, null];
                        }
                        url = [
                            this.baseURL + "?st_type=Edit",
                            "&shop_pid=" + this.shopPID,
                            "&shop_id=" + shopID,
                            "&shop_key=" + this.shopKey,
                            "&ivm_id=" + username,
                            "&ivm_pw=" + password,
                            "&ivm_pw_edit=" + password
                        ];
                        if (name != null) {
                            url.push("&ivm_name=" + name);
                        }
                        if (nickname != null) {
                            url.push("&ivm_nick=" + nickname);
                        }
                        if (mobile != null) {
                            url.push("&ivm_hp=" + mobile);
                        }
                        return [4 /*yield*/, axios_1.default.get(url.join(""))];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, {
                                resultCode: response.data.impactvision.result_code,
                                resultMessage: response.data.impactvision.result_message
                            }];
                    case 2:
                        error_2 = _b.sent();
                        logger_1.Logger.showError(String(error_2));
                        return [2 /*return*/, error_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Impact Vision 계정을 삭제합니다.
     * @param branchID 지점 번호
     * @param username 아이디
     * @param password 비밀번호
     */
    ImpactVisionAuthentication.prototype.deleteUser = function (branchID, username, password) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var shopID, url, response, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        shopID = (_a = this.getBranchInfo(branchID)) === null || _a === void 0 ? void 0 : _a.id;
                        if (shopID == null) {
                            return [2 /*return*/, null];
                        }
                        url = [
                            this.baseURL + "?st_type=Delete",
                            "&shop_pid=" + this.shopPID,
                            "&shop_id=" + shopID,
                            "&shop_key=" + this.shopKey,
                            "&ivm_id=" + username,
                            "&ivm_pw=" + password,
                            "&ivm_pw_edit=" + password
                        ];
                        return [4 /*yield*/, axios_1.default.get(url.join(""))];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, {
                                resultCode: response.data.impactvision.result_code,
                                resultMessage: response.data.impactvision.result_message
                            }];
                    case 2:
                        error_3 = _b.sent();
                        logger_1.Logger.showError(String(error_3));
                        return [2 /*return*/, error_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Impact Vision DB에서 사용자 아이디 중복검색을 합니다.
     * @param branchID 지점 번호
     * @param username 중복 검색할 아이디
     */
    ImpactVisionAuthentication.prototype.checkUsername = function (branchID, username) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var shopID, url, response, isAvailable, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        shopID = (_a = this.getBranchInfo(branchID)) === null || _a === void 0 ? void 0 : _a.id;
                        if (shopID == null) {
                            return [2 /*return*/, null];
                        }
                        url = [
                            this.baseURL + "?st_type=Idcheck",
                            "&shop_pid=" + this.shopPID,
                            "&shop_id=" + shopID,
                            "&shop_key=" + this.shopKey,
                            "&ivm_id=" + username
                        ];
                        return [4 /*yield*/, axios_1.default.get(url.join(""))];
                    case 1:
                        response = _b.sent();
                        isAvailable = response.data.impactvision.result_code == "SUCCESS" ? false : true;
                        return [2 /*return*/, {
                                error: null,
                                isAvailable: isAvailable
                            }];
                    case 2:
                        error_4 = _b.sent();
                        logger_1.Logger.showError(String(error_4));
                        return [2 /*return*/, {
                                error: error_4,
                                isAvailable: false
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 사용자 목록보기
     * @param pageIndex 검색할 리스트의 index
     * @param branchID 지점 번호
     */
    ImpactVisionAuthentication.prototype.getUserList = function (pageIndex, branchID) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var shopID, url, response, usersObjArray, users, error_5;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        shopID = (_a = this.getBranchInfo(branchID)) === null || _a === void 0 ? void 0 : _a.id;
                        url = [
                            this.baseURL + "?st_type=List",
                            "&page_idx=" + pageIndex,
                            "&page_line=100",
                            "&shop_pid=" + this.shopPID,
                            "&shop_id=" + shopID,
                            "&shop_key=" + this.shopKey
                        ].join("");
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 1:
                        response = _b.sent();
                        usersObjArray = response.data.impactvision.member_info;
                        return [4 /*yield*/, usersObjArray.map(function (userObj) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, new impactVisionUser_1.ImpactVisionUser(userObj)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })];
                    case 2:
                        users = _b.sent();
                        return [2 /*return*/, {
                                resultCode: response.data.impactvision.result_code,
                                resultMessage: response.data.impactvision.result_message,
                                data: {
                                    Users: users
                                }
                            }];
                    case 3:
                        error_5 = _b.sent();
                        logger_1.Logger.showError(String(error_5));
                        return [2 /*return*/, error_5];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ImpactVisionAuthentication.prototype.getBranchInfo = function (branchID) {
        switch (branchID) {
            case 0:
                return {
                    id: "ivm060117",
                    password: process.env.BRANCH_0
                };
            case 1:
                return {
                    id: "ivm130147",
                    password: process.env.BRANCH_1
                };
            case 2:
                return {
                    id: "ivm020109",
                    password: process.env.BRANCH_2
                };
            default:
                return null;
        }
    };
    ImpactVisionAuthentication.getBranchID = function (branchID) {
        switch (branchID) {
            case "ivm060117": //삼성
                return 0;
            case "ivm130147": //위례
                return 1;
            case "ivm020109": //성북
                return 2;
            case "반포":
                return 3;
            case "잠실":
                return 4;
            case "평촌":
                return 5;
            case "정자":
                return 6;
            case "의왕":
                return 7;
            default:
                return 999;
        }
    };
    ImpactVisionAuthentication.prototype.createPassword = function (id, name, mobile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, id + "_" + name + "_" + mobile];
            });
        });
    };
    return ImpactVisionAuthentication;
}());
exports.ImpactVisionAuthentication = ImpactVisionAuthentication;
