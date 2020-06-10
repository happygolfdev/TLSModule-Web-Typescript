"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImpactVisionPlate = /** @class */ (function () {
    function ImpactVisionPlate(id, object) {
        this.id = id;
        this.shopID = object.client_shop_id;
        this.lockKey = object.client_lock_key;
        this.name = object.client_nick;
        this.registeredAt = new Date(object.client_regdate);
        this.isComputerOn = object.client_status_pc === "on" ? true : false;
        this.isProjectorOn =
            object.client_status_pj === "on"
                ? true
                : object.client_status_pj === "off"
                    ? false
                    : undefined;
        this.isGameOn = object.client_status_game === "on" ? true : false;
        this.remainingSeconds = object.client_remain_time;
    }
    return ImpactVisionPlate;
}());
exports.ImpactVisionPlate = ImpactVisionPlate;
