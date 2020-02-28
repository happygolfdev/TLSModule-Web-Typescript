"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestConfig_1 = require("../network/requestConfig");
var ExampleRequest = /** @class */ (function () {
    function ExampleRequest(type) {
        this.baseURL = "https://golfroad72.co.kr/";
        this.tokeRenewalURL = "localhost:3001/v1/token";
        switch (type) {
            case RequestType.signIn:
                this.config = new requestConfig_1.RequestConfig("auth/", requestConfig_1.Method.post);
            case RequestType.signOut:
                this.config = new requestConfig_1.RequestConfig("auth/", requestConfig_1.Method.put);
        }
    }
    ExampleRequest.prototype.addBody = function (body) {
        if (body == null) {
            return;
        }
        this.config.body = body;
    };
    return ExampleRequest;
}());
exports.ExampleRequest = ExampleRequest;
var RequestType;
(function (RequestType) {
    RequestType[RequestType["signIn"] = 0] = "signIn";
    RequestType[RequestType["signOut"] = 1] = "signOut";
})(RequestType || (RequestType = {}));
exports.RequestType = RequestType;