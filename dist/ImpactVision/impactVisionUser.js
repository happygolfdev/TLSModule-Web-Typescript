"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var impactVisionManager_1 = require("./impactVisionManager");
var ImpactVisionUser = /** @class */ (function () {
    function ImpactVisionUser(object) {
        this.id = Number(object.ivm_index);
        this.username = object.ivm_id;
        this.password = object.ivm_pw;
        this.name = object.ivm_name;
        this.nickname = object.ivm_nick;
        this.mobile = object.ivm_hp;
        this.branchID = impactVisionManager_1.ImpactVisionManager.getBranchID(object.shop_id);
    }
    return ImpactVisionUser;
}());
exports.ImpactVisionUser = ImpactVisionUser;
