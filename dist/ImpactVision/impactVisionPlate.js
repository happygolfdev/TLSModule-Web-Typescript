"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImpactVisionPlate = /** @class */ (function () {
    function ImpactVisionPlate(object) {
        this.shopID = object.client_shop_id;
        this.lockKey = object.client_lock_key;
        this.name = object.client_nick;
        this.registeredAt = new Date(object.client_regdate);
    }
    return ImpactVisionPlate;
}());
exports.ImpactVisionPlate = ImpactVisionPlate;
